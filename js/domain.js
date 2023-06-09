$(document).ready(function () {
    $(".table-container").hide();
    $("#no-data-container").hide();

    $("#verify-button").click(function () {
        var domain = $("input").val();
        if (domain) {
            seeDomain(domain);
        } else {
            showMessageDialog("Neuvedl jste žádnou doménu!");
        }
    });
})

function seeDomain(domain) {
    post('/api/free_domain.php', valueToData('domain', domain), getAuth())
        .then(data => {
            if (data.freeDomains.length > 0) {
                $("#no-data-container").hide();
                updateTable(data.freeDomains);
                $(".table-container").hide().slideDown("fast");
            } else {
                $(".table-container").hide()
                $("#no-data-container").hide().slideDown("fast");
            }
        });
}

function updateTable(freeDomains) {
    let contents = ``;
    freeDomains.forEach(domain => {
        constents += `
    <tr>
        <th scope="row">${domain.name}</th>
        <td>${domain.cost} Kč</td>
        <td class="td-button"><button class="btn btn-outline-success order-button" onclick="getDomain('${domain.name}')" >Objednat</button>
        </td>
    </tr>`;
    });

    $('#table-body').html(contents);
};

function getDomain(domain) {
    const auth = getAuth();
    if (auth) {
        post('/api/get_domain.php', valueToData('domain', domain), auth)
        .then(data => {
            if (data.success) {
                //TODO: zobrazit přihlašovací údaje k db a ftp
            } else {
                showMessageDialog("Doménu se nepodařilo zaregistrovat!");
            }
        });
    } else {
        showMessageDialog("Nejprve se musíte přihlásit.");
    }
}