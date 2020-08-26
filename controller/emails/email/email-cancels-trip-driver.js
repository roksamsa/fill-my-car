const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  nodemailerTransporterOptions,
  emailAndNameForNapolniMojAvto,
  emailTemplateTop,
  emailTemplateBottom
} = require('../emails-common');

const sendEmailURIForDriverWhenSomebodyCancelsTheTrip = '/emails/driver-when-cancel-trip';

/* Email for DRIVER when somebody joins the trip */
router.post(sendEmailURIForDriverWhenSomebodyCancelsTheTrip, (req, res) => {
  var transporter = nodemailer.createTransport(nodemailerTransporterOptions);

  var mailOptionsForDriverWhenSomebodyCancelsTheTrip = {
    from: emailAndNameForNapolniMojAvto,
    to: req.body.driverEmailAddress,
    subject: 'Preklic rezervacije na potovanju #' + req.body.tripIdTag + ' (' + req.body.startLocation + ' - ' + req.body.endLocation + ')',
    html:
      emailTemplateTop +
      `<!-- START MAIN CONTENT AREA -->
      <tr>
        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
          <tr>
            <td>
              <img alt="Napolni moj avto" title="Napolni moj avto" src="https://napolnimojavto.si/napolni-moj-avto-logo.png" />
            </td>
          </tr>
            <tr>
              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Pozdravljeni <b>${req.body.driverName}</b>,</p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                Na vašem potovanju <b><a href="https://napolnimojavto.si/potovanje/${req.body.tripIdTag}">#${req.body.tripIdTag}</a> (${req.body.startLocation} - ${req.body.endLocation})</b> je prišlo do spremembe. Potnik <b>${req.body.passengerName} (${req.body.passengerEmailAddress})</b> je preklical svojo rezervacijo na vašem potovanju.</p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin-bottom: 0;">
                  Želimo ti prijetno pot,
                </p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0;">
                  tvoja ekipa Napolni moj avto :)
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>` + emailTemplateBottom
  };

  transporter.sendMail(mailOptionsForDriverWhenSomebodyCancelsTheTrip, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        message: 'Successfuly sent!'
      });
    }
  });
});

module.exports = router;
