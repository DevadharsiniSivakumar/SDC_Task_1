
    function generateInvoice() {
        const name = document.getElementById('customer-name').value;
        const address = document.getElementById('customer-address').value;
        const description = document.getElementById('item-description').value;
        const quantity = parseFloat(document.getElementById('quantity').value);
        const price = parseFloat(document.getElementById('price-per-unit').value);
        const taxRate = parseFloat(document.getElementById('tax-rate').value);

        const subtotal = quantity * price;
        const tax = (subtotal * taxRate) / 100;
        const total = subtotal + tax;

        const invoiceContent = `
            <p><strong>Customer Name:</strong> ${name}</p>
            <p><strong>Address:</strong> ${address}</p>
            <table class="invoice-details">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price per Unit</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${description}</td>
                        <td>${quantity}</td>
                        <td>$${price.toFixed(2)}</td>
                        <td>$${subtotal.toFixed(2)}</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Tax (${taxRate}%):</strong> $${tax.toFixed(2)}</p>
            <p><strong>Total Amount Due:</strong> $${total.toFixed(2)}</p>
        `;

        document.getElementById('invoice-content').innerHTML = invoiceContent;
        document.getElementById('invoice-container').style.display = 'block';
    }

    function printInvoice() {
        const printContent = document.getElementById('invoice-container').innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload();
    }

    function downloadInvoice() {
        const invoiceElement = document.getElementById('invoice-container');
        const opt = {
            margin: 1,
            filename: 'invoice.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(invoiceElement).set(opt).save();
    }
