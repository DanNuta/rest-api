"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const Contact_1 = require("../models/Contact");
exports.contactRouter = express_1.default.Router();
const transport = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "dany.condurari@gmail.com",
        pass: "duuzvugjbcogoetx",
    },
});
exports.contactRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactForm = new Contact_1.ContactModel({
        name: req.body.nume,
        prenume: req.body.prenume,
        email: req.body.email,
        tel: req.body.tel,
        message: req.body.message,
    });
    try {
        const contact = yield contactForm.save();
        const html = `
  <table style="border: 1px solid black; width: 50%;">
  <thead style="font-weight: bold">
    <tr>
     <td style="border: 1px solid black">Nume</td>
     <td style="border: 1px solid black">Prenume</td>
     <td style="border: 1px solid black">Email</td>
     <td style="border: 1px solid black">Telefon</td>
     <td style="border: 1px solid black">Messaj</td>
    </tr>
  </thead>

  <tbody>
  <tr>
   <td style="border: 1px solid black">${contact.name}</td>
   <td style="border: 1px solid black">${contact.prenume}</td>
   <td style="border: 1px solid black">${contact.email}</td>
   <td style="border: 1px solid black">${contact.tel}</td>
   <td style="border: 1px solid black">${contact.message}</td>
  </tr>
</tbody>
  </table>
`;
        const info = yield transport.sendMail({
            from: `dany.condurari@gmail.com`,
            to: "dany.condurari@gmail.com",
            subject: "Nou contact",
            html: html,
        });
        res.send(info);
    }
    catch (e) {
        res.json({ message: e });
    }
}));
