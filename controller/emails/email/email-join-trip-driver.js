const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const {
  nodemailerTransporterOptions,
  emailAndNameForNapolniMojAvto,
  emailTemplateTop,
  emailTemplateBottom
} = require('../emails-common');

const sendEmailURIForDriverWhenSomebodyJoinsTheTrip = '/emails/driver-when-joins-trip';

/* Email for DRIVER when somebody joins the trip */
router.post(sendEmailURIForDriverWhenSomebodyJoinsTheTrip, (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport(nodemailerTransporterOptions);

  var mailOptionsForDriverWhenSomebodyJoinsTheTrip = {
    from: emailAndNameForNapolniMojAvto,
    to: req.body.driverEmailAddress,
    subject: 'Nova rezervacija na potovanje #' + req.body.tripIdTag + ' (' + req.body.startLocation + ' - ' + req.body.endLocation + ')',
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
                Na vaše potovanje <b><a href="https://napolnimojavto.si/potovanje/${req.body.tripIdTag}">#${req.body.tripIdTag}</a> (${req.body.startLocation} - ${req.body.endLocation})</b> ste prejeli novo rezervacijo.</p>
                <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                  <tbody>
                    <tr>
                      <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                          <tbody>
                            <tr>

                              <td>
                                <tr>
                                  <td>Potovanje:</td>
                                  <td><b>${req.body.startLocation} - ${req.body.endLocation} (#${req.body.tripIdTag})</b></td>
                                </tr>
                                <tr>
                                  <td>Datum in čas odhoda:</td>
                                  <td><b>${req.body.tripDate}</b></td>
                                </tr>
                                <tr>
                                  <td>Vozilo:</td>
                                  <td><b>${req.body.tripVehicle}</b></td>
                                </tr>
                                <tr>
                                  <td>Barva vozila:</td>
                                  <td><b>${req.body.tripVehicleColor}</b></td>
                                </tr>
                              </td>

                              <td>
                                <tr>
                                  <td>Strošek potovanja na osebo:</td>
                                  <td><b>${req.body.tripPrice} EUR</b></td>
                                </tr>
                                <tr>
                                  <td>Koliko mest je potnik rezerviral?</td>
                                  <td><b>${req.body.reservedSeatsNumber}</b></td>
                                </tr>
                                <tr>
                                  <td>Potnike pobereš na lokaciji:</td>
                                  <td><b>${req.body.reservedStartLocation}</b></td>
                                </tr>
                                <tr>
                                  <td>Potnike odložiš na lokaciji:</td>
                                  <td><b>${req.body.reservedEndLocation}</b></td>
                                </tr>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #D93362; border-radius: 30px; text-align: center;"> <a href="https://napolnimojavto.si/potovanje/${req.body.tripIdTag}/odjava?e=${req.body.driverEmailAddress}?t=${req.body.tripId}?d=${req.body.tripDate}" target="_blank" style="margin: 0; display: inline-block; color: #ffffff; background-color: #D93362; border: solid 1px #D93362; border-radius: 30px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; padding: 12px 25px; border-color: #D93362;">Preklic rezervacije</a></td>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #D93362; border-radius: 30px; text-align: center;"></td>
                      </tr>
                    </tr>
                  </tbody>
                </table>
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

  transporter.sendMail(mailOptionsForDriverWhenSomebodyJoinsTheTrip, (error, info) => {
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
