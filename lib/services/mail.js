'use strict';

const { Service } = require('schmervice'); 

const nodemailer = require("nodemailer");

module.exports = class MailService extends Service {

          async mailUserCreation(user) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
              },
            });
        
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Mael Fiaudrin" <noreply@projetnode.com>', // sender address
              to: user.mail, // list of receivers
              subject: "Confirmation de création d'un compte - Projet Node | MF", // Subject line
              text: "Félicitation "+user.firstName+" !\r\n Vous avez bien créé un compte sur le site : Projet Node | MF \r\n Toute l'équipe vous souhaite la bienvenue, vous pouvez désormais parcourir notre bibliothèque de films et ajouter dés aujourd'hui des films en favori !", // plain text body
              html: "<p>Félicitation <b>"+user.firstName+"</b> !</p> Vous avez bien créé un compte sur le site : Projet Node | MF<p>Toute l'équipe vous souhaite la bienvenue, vous pouvez désormais parcourir notre bibliothèque de films et ajouter dés aujourd'hui des films en favori !</p>", // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }


          async mailFilmCreation(film, mails) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
              },
            });

            let listMails = "";
            for(let i = 0; i<= mails.length-1; i++){
              if(i == mails.length-1){
                listMails += mails[i].mail;
              } else{
                listMails += mails[i].mail+", ";
              }
              
            }
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Mael Fiaudrin" <noreply@projetnode.com>', // sender address
              to: listMails, // list of receivers
              subject: "Un nouveau film a été publié - Projet Node | MF", // Subject line
              text: "Venez découvrir le nouveau film "+film.title+" !\r\n Intéressé ? Alors ajoutez le en favori !", // plain text body
              html: "<p>Venez découvrir le nouveau film <b>"+film.title+"</b> !</p> Intéressé ? Alors ajoutez le en favori !</p>", // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }


          async mailFilmUpdate(film, mails) {
            // Generate test SMTP service account from ethereal.email
            // Only needed if you don't have a real mail account for testing
            let testAccount = await nodemailer.createTestAccount();
        
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
              },
            });

            let listMails = "";
            for(let i = 0; i<= mails.length-1; i++){
              if(i == mails.length-1){
                listMails += mails[i].mail;
              } else{
                listMails += mails[i].mail+", ";
              }
            }
            // send mail with defined transport object
            let info = await transporter.sendMail({
              from: '"Mael Fiaudrin" <noreply@projetnode.com>', // sender address
              to: listMails, // list of receivers
              subject: "Un film que vous avez en favori a été mis à jour - Projet Node | MF", // Subject line
              text: "Venez découvrir les nouveautés concernant le film "+film.title+" !", // plain text body
              html: "<p>Venez découvrir les nouveautés concernant le film <b>"+film.title+"</b> !", // html body
            });
        
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
          }
}