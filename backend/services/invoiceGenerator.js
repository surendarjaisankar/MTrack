const PDFDocument = require("pdfkit");

const generateInvoice = (booking, driver, res) => {
  const doc = new PDFDocument({ margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=Invoice-${booking._id}.pdf`
  );

  doc.pipe(res);

  /* =============================
     COMPANY HEADER
  ============================== */
  doc
    .fontSize(22)
    .fillColor("#0f172a")
    .text("MOBILE TRACK CALL TAXI", { align: "center" });

  doc
    .fontSize(10)
    .fillColor("gray")
    .text("Karur, Tamil Nadu", { align: "center" })
    .text("Phone: xxxxxxxxx", { align: "center" })
    .text("GST: 33ABCDE1234F1Z5", { align: "center" });

  doc.moveDown(2);

  /* =============================
     INVOICE INFO
  ============================== */
  doc.fillColor("black").fontSize(14).text("INVOICE");

  doc.fontSize(10);
  doc.text(`Invoice ID: ${booking._id}`);
  doc.text(`Date: ${new Date().toLocaleDateString()}`);
  doc.moveDown();

  /* =============================
     CUSTOMER DETAILS
  ============================== */
  doc.fontSize(12).text("Bill To:");
  doc.fontSize(10);
  doc.text(`Name: ${booking.customerName}`);
  doc.text(`Phone: ${booking.customerPhone}`);
  doc.moveDown();

  /* =============================
     TRIP DETAILS TABLE
  ============================== */

  doc.moveTo(50, doc.y)
     .lineTo(550, doc.y)
     .stroke();

  doc.moveDown(0.5);

  doc.fontSize(10);
  doc.text("Trip Type", 50);
  doc.text("Vehicle", 150);
  doc.text("Distance", 250);
  doc.text("Fare", 350);
  doc.text("Tax", 430);
  doc.text("Total", 500);

  doc.moveDown(0.5);

  doc.moveTo(50, doc.y)
     .lineTo(550, doc.y)
     .stroke();

  doc.moveDown(0.5);

  doc.text(booking.tripType, 50);
  doc.text(booking.vehicleCategory, 150);
  doc.text(`${booking.distanceKm} KM`, 250);
  doc.text(`₹${booking.fare}`, 350);
  doc.text(`₹${booking.tax}`, 430);
  doc.text(`₹${booking.totalAmount}`, 500);

  doc.moveDown(2);

  /* =============================
     DRIVER DETAILS
  ============================== */
  if (driver) {
    doc.fontSize(12).text("Driver Details:");
    doc.fontSize(10);
    doc.text(`Name: ${driver.name}`);
    doc.text(`Phone: ${driver.phone}`);
    doc.moveDown();
  }

  /* =============================
     PAYMENT
  ============================== */
  doc.fontSize(12).text("Payment Details:");
  doc.fontSize(10);
  doc.text(`Payment Method: ${booking.paymentMethod}`);

  doc.moveDown(2);

  /* =============================
     FOOTER
  ============================== */
  doc
    .fontSize(9)
    .fillColor("gray")
    .text(
      "Thank you for choosing Mobile Track Call Taxi. Have a safe journey!",
      { align: "center" }
    );

  doc.end();
};

module.export = generateInvoice;
