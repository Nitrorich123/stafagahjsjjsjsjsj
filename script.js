function generateReceipt() {
    // Get form values
    const orderNumber = document.getElementById('orderNumber').value;
    const transactionDate = document.getElementById('transactionDate').value;
    const deliveryDate = document.getElementById('deliveryDate').value;
    const customerName = document.getElementById('customerName').value;
    const address = document.getElementById('address').value;
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;
    const size = document.getElementById('size').value;
    const colorway = document.getElementById('colorway').value;
    const styleCode = document.getElementById('styleCode').value;
    const condition = document.getElementById('condition').value;
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value) || 0;
    const processingFee = parseFloat(document.getElementById('processingFee').value) || 0;
    const shipping = parseFloat(document.getElementById('shipping').value) || 0;
    const importDuties = parseFloat(document.getElementById('importDuties').value) || 0;
    const authCode = document.getElementById('authCode').value;
    const notes = document.getElementById('notes').value;
    const fontStyle = document.getElementById('fontStyle').value;

    // Calculate tax and total
    const tax = (purchasePrice * (taxRate / 100)).toFixed(2);
    const total = (purchasePrice + parseFloat(tax) + processingFee + shipping + importDuties).toFixed(2);

    // Update preview
    document.getElementById('previewDate').textContent = transactionDate || 'N/A';
    document.getElementById('previewCustomerName').textContent = customerName || 'N/A';
    document.getElementById('previewAddress').textContent = address || 'N/A';
    document.getElementById('previewOrderNumber').textContent = orderNumber || 'N/A';
    document.getElementById('previewProductName').textContent = productName || 'N/A';
    document.getElementById('previewCategory').textContent = category || 'N/A';
    document.getElementById('previewSize').textContent = size || 'N/A';
    document.getElementById('previewColorway').textContent = colorway || 'N/A';
    document.getElementById('previewStyleCode').textContent = styleCode || 'N/A';
    document.getElementById('previewCondition').textContent = condition || 'N/A';
    document.getElementById('previewPurchasePrice').textContent = purchasePrice.toFixed(2);
    document.getElementById('previewTax').textContent = tax;
    document.getElementById('previewProcessingFee').textContent = processingFee.toFixed(2);
    document.getElementById('previewShipping').textContent = shipping.toFixed(2);
    document.getElementById('previewImportDuties').textContent = importDuties.toFixed(2);
    document.getElementById('previewTotal').textContent = total;
    document.getElementById('previewAuthCode').textContent = authCode || 'N/A';
    document.getElementById('previewNotes').textContent = notes || 'N/A';

    // Apply font style
    document.getElementById('receiptPreview').style.fontFamily = fontStyle;

    // Handle image upload
    const imageUpload = document.getElementById('imageUpload').files[0];
    if (imageUpload) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('previewImage').src = e.target.result;
        };
        reader.readAsDataURL(imageUpload);
    }

    // Generate barcode
    JsBarcode("#barcode", orderNumber || "1234567-1234567", {
        format: "CODE128",
        displayValue: true,
        height: 50,
        width: 2
    });
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const receipt = document.getElementById('receiptPreview');

    doc.html(receipt, {
        callback: function (doc) {
            doc.save('StockX_Receipt.pdf');
        },
        x: 10,
        y: 10,
        width: 190,
        windowWidth: receipt.offsetWidth
    });
}

function sendEmail() {
    const email = prompt("Enter email address to send the receipt:");
    if (email) {
        alert(`Receipt would be sent to ${email}. (Email functionality is simulated for this demo.)`);
    }
}
