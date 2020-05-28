const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

const sendEmailURI = '/send-email';
const emailUser = 'info@napolnimojavto.si';

const emailTemplateTop = `
<!doctype html>
<html>
<head>
<meta name="viewport" content="width=device-width">
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Simple Transactional Email</title>
<style>
/* -------------------------------------
    INLINED WITH htmlemail.io/inline
------------------------------------- */
/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }
  table[class=body] p,
        table[class=body] ul,
        table[class=body] ol,
        table[class=body] td,
        table[class=body] span,
        table[class=body] a {
    font-size: 16px !important;
  }
  table[class=body] .wrapper,
        table[class=body] .article {
    padding: 10px !important;
  }
  table[class=body] .content {
    padding: 0 !important;
  }
  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }
  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }
  table[class=body] .btn table {
    width: 100% !important;
  }
  table[class=body] .btn a {
    width: 100% !important;
  }
  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}

/* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
  .ExternalClass {
    width: 100%;
  }
  .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
    line-height: 100%;
  }
  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }
  #MessageViewBody a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
  }
  .btn-primary table td:hover {
    background-color: #34495e !important;
  }
  .btn-primary a:hover {
    background-color: #34495e !important;
    border-color: #34495e !important;
  }
}
</style>
</head>
<body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
  <tr>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
    <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
      <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

        <!-- START CENTERED WHITE CONTAINER -->
        <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
        <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
`;

const emailTemplateBottom = `
        <!-- END MAIN CONTENT AREA -->
        </table>

        <!-- START FOOTER -->
        <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
            <tr>
              <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Napolni moj avto ℗ 2020</span>
              </td>
            </tr>
            <tr>
              <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                Se vidimo na poti :)
              </td>
            </tr>
          </table>
        </div>
        <!-- END FOOTER -->

      <!-- END CENTERED WHITE CONTAINER -->
      </div>
    </td>
    <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
  </tr>
</table>
</body>
</html>
`;

router.post(sendEmailURI, (req, res) => {
  console.log(req.body, 'data of form');
  var transporter = nodemailer.createTransport({
    host: 'mail.napolnimojavto.si',
    secure: 'true',
    port: '465',
    auth: {
      user: emailUser,
      pass: 'gVA{~YJdkH+3gQ-[9m'
    }
  });

  var mailOptionsForPassenger = {
    from: emailUser,
    to: req.body.passengerEmailAddress,
    subject: 'Potrditev rezervacije na potovanje #' + req.body.tripIdTag + ' (' + req.body.startLocation + ' - ' + req.body.endLocation + ')',
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
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Pozdravljen/a popotnik/ca <b>${req.body.passengerName}</b>,</p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">
                Prejeli smo vašo rezervacijo poti <b><a href="https://napolnimojavto.si/potovanje/${req.body.tripIdTag}">#${req.body.tripIdTag}</a> (${req.body.startLocation} - ${req.body.endLocation})</b>, katero ste oddali na naši platformi <b><a href="https://napolnimojavto.si/potovanje/${req.body.tripIdTag}">Napolni moj avto</a></b>.</p>
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
                                  <td>Voznika/ca: </td>
                                  <td><b>${req.body.driverName}</b></td>
                                </tr>
                                <tr>
                                  <td>Koliko mest ste rezervirali?</td>
                                  <td><b>${req.body.reservedSeatsNumber}</b></td>
                                </tr>
                                <tr>
                                  <td>Voznik vas pobere na lokaciji:</td>
                                  <td><b>${req.body.reservedStartLocation}</b></td>
                                </tr>
                                <tr>
                                  <td>Voznik vas pobere odloži na lokaciji:</td>
                                  <td><b>${req.body.reservedEndLocation}</b></td>
                                </tr>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #D93362; border-radius: 30px; text-align: center;"> <a href="http://htmlemail.io" target="_blank" style="margin: 0; display: inline-block; color: #ffffff; background-color: #D93362; border: solid 1px #D93362; border-radius: 30px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; padding: 12px 25px; text-transform: capitalize; border-color: #D93362;">Preklic rezervacije</a></td>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #D93362; border-radius: 30px; text-align: center;"></td>
                      </tr>
                    </tr>
                  </tbody>
                </table>
                <p><b>Zelo pomembno!</b> Prosimo, da ste na izhodiščni točki najpozneje 5 minut pred odhodom.</p>
                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0;">
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

  transporter.sendMail(mailOptionsForPassenger, (error, info) => {
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
