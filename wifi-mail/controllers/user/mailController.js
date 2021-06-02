const Mail = require('../../models/mailModel');
const errorHandler = require('../../utils/errorHandler');
const nodemailer = require('nodemailer');

// отправка email start
const transporter = nodemailer.createTransport(
    {
        host: 'smtp.mail.ru',
        port: 465,
        secure: true, //true for 465, false for other ports
        auth: {
            user: 'itamcompany@mail.ru',
            pass: '0jtpjm1305'
        }
    },
    {
        from: "itamcompany@mail.ru"
    }
);
const mailer = message => {
    transporter.sendMail(message, (error, info) => {
        if (error) return console.log(error);
        console.log("Емайл отправлен :", info);
        return info;
    })
}

module.exports.messageFromEuronews = async (req, res) => {
    try {
        console.log(req.body);
        const message = {

            // to: req.body.adminEmail,
            to: "ztavruz1987@mail.ru",
            subject: "Вам отправленно сообщение от посетителя сайта www.eurasnews.ru",
            text:
                `Имя: ${req.body.name} ,
                 Email: ${req.body.email},
                 Номер телефона: ${req.body.phone},
                 Сообщение: ${req.body.message},
                 
                 Данное письмо не требует ответа
                 `
        }
        const mailRes = await mailer(message);
        res.status(201).json(mailRes);
    } catch (error) {
        errorHandler(res, error);
    }
}

module.exports.messageFromLK = async (req, res) => {
    try {
        const message = {

            to: "ztavruz1987@mail.ru",
            subject: "Вам отправленна просьба добавить транспорт в аккаунт клиента",
            text:
                `Тип транспорта: ${req.body.type},
                 Номер транспорта: ${req.body.numberTC},
                 Для компании: ${req.body.companyId},
                 Телефон для связи: 
                 
                 Данное письмо не требует ответа
                 `
        }
        console.log("req :", req.body);
        const mailRes = await mailer(message)
        console.log("mailRes :", mailRes);
        res.status(201).json(mailRes);
    } catch (error) {
        errorHandler(res, error);
    }
}
// отправка email end

// module.exports.getAll = async (req, res) => {
//     try {
//         const transports = await Transports.find(
//             {
//                 companyId: req.user.companyId,
//             }
//         );
//         res.status(200).json(transports);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
//
//
// module.exports.getById = async (req, res) => {
//     try {
//         const transport = await Transports.findById(
//             {
//                 _id: req.params.id,
//             }
//         );
//         res.status(200).json(transport);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
// module.exports.getByNumber = async (req, res) => {
//     try {
//         const transport = await Transports.findById(
//             {
//                 numberTC: req.params.id,
//             }
//         );
//         res.status(200).json(transport);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
// module.exports.searchByField = async (req, res) => {
//     try {
//         let transport = {}
//         if (req.body.typeSearchField == "ТС") {
//             transport = await Transports.find(
//                 {
//                     numberTC: req.body.searchInput,
//                 }
//             );
//         } else if (req.body.typeSearchField == "VIN") {
//             transport = await Transports.find(
//                 {
//                     VNTO: req.body.searchInput,
//                 }
//             );
//         }
//         res.status(200).json(transport);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
//
//
// module.exports.update = async (req, res) => {
//     try {
//         const updatedTransport = await Transports.findOneAndUpdate(
//             {_id: req.params.id},
//             {$set: req.body},
//             {new: true}
//         );
//         res.status(200).json(updatedTransport);
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
//
// module.exports.remove = async (req, res) => {
//     try {
//         await Transports.remove({_id: req.params.id});
//         res.status(200).json({message: "Транспорт удален из списка компании."});
//     } catch (error) {
//         errorHandler(res, error);
//     }
// }
