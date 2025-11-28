const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let tables = []

$(document).ready(async () => {
    // create tables
    for (i = 0; i < 8; i++) {
        let name = 'Τραπέζι ' + (i + 1);

        tables.push({
            id: i,
            name: name,
            open: true,
            value: (Math.random() * 100).toFixed(2)
        });
    }

    console.log(
        JSON.stringify(tables)
    )

    // set tables

    for (i = 0; i < tables.length; i++) {
        let table = tables[i];
        
        if (table.open === true) {
            $('#table-body').append(`
                <tr>
                    <td>${table.name}</td>
                    <td class="amount">${table.value}€</td>
                    <td><button class="add_amount_button">+</button></td>
                    <td><button class="pay_table_button">Πληρωμή</button></td>
                </tr>
            `)
        }
    }

    open_table = () => {
        Swal.fire({
            title: 'Προσθήκη',
            html:
                '<input id="swal-name" class="swal-input" placeholder="Όνομα ή Τραπέζι">' +
                '<input id="swal-amount" type="number" min="1" class="swal-input" placeholder="Ποσό (€)" value="1">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Προσθήκη',
            cancelButtonText: 'Άκυρο',
            customClass: {
                popup: 'swal-popup',
                confirmButton: 'swal-confirm',
                cancelButton: 'swal-cancel'
            },
            preConfirm: () => {
                const name = document.getElementById('swal-name').value.trim();
                const amount = parseFloat(document.getElementById('swal-amount').value);
                if (!name || isNaN(amount) || amount <= 0) {
                    Swal.showValidationMessage('Συμπλήρωσε σωστά τα πεδία');
                    return false;
                }
                return { name, amount };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { name, amount } = result.value;
                const tbody = document.getElementById("table-body");
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${name}</td>
                    <td class="amount">${amount.toFixed(2)}€</td>
                    <td><button class="add_amount_button">+</button></td>
                    <td><button class="pay_table_button">Πληρωμή</button></td>
                `;
                tbody.appendChild(row);
            }
        });
    };


    close_table = (el) => {
        el.closest('tr').remove();
    };

    add_amount = (button) => {
        Swal.fire({
            title: 'Προσθήκη',
            html:
                '<input id="swal-amount" type="number" min="1" class="swal-input" placeholder="Ποσό (€)" value="1">',
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Προσθήκη',
            cancelButtonText: 'Άκυρο',
            customClass: {
                popup: 'swal-popup',
                confirmButton: 'swal-confirm',
                cancelButton: 'swal-cancel'
            },
            preConfirm: () => {
                const amount = parseFloat(document.getElementById('swal-amount').value);
                if (isNaN(amount) || amount <= 0) {
                    Swal.showValidationMessage('Συμπλήρωσε σωστά τα πεδία');
                    return false;
                }
                return amount;
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const amount = result.value;
                const current_amount_el = button.closest("tr").querySelector('.amount');
                const current_amount = parseFloat(current_amount_el.textContent);

                if (!isNaN(amount) && amount > 0) {
                    current_amount_el.textContent = (current_amount + amount).toFixed(2);
                }

            }
        });
    }


    // buttons
    const open_table_btn = $('#open_table_btn');

    open_table_btn.on('click', open_table)

    $(document).on('click', '.add_amount_button', function() {
        add_amount(this);
    });
    $(document).on('click', '.btn-close', function() {
        close_table(this);
    });
    
})

