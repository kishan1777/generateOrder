const cron = require("node-cron");
const logger = require("../../../../config/logger");
const Order = require("../order/model");
const nodemailer = require("nodemailer");

async function sendEmail(mailOption) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "example@gmail.com", // Your Gmail address
      pass: "password", // Your Gmail password or app-specific password
    },
  });

  let mailOptions = {
    from: '"exaple" <example@gmail.com>',
    to: mailOption.to,
    subject: "Order recived",
    text: mailOption.text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    logger.debug("Message sent: %s", info.messageId);
  } catch (error) {
    logger.error("Error sending email:", error);
  }
}

module.exports.cronJob = () => {
  cron.schedule("0 22 * * *", async () => {
    try {
      logger.info("Starting cron job");
      let end = new Date(Date.now());

      let start = new Date(end.getTime() - 1 * 24 * 60 * 60 * 1000);
      const orders = await Order.find({
        createdAt: { $gte: start, $lte: end },
      }).populate("product_creator_id");

      for (let order of orders) {
        let mailOption = {
          to: order.product_creator_id.email,
          text: `Order Recived`,
        };
        await sendEmail(mailOption);
      }
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  });
};
