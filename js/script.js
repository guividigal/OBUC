var arrLocaisTrabalho;

window.onload = () => {
    arrLocaisTrabalho = getArray();

    arrLocaisTrabalho.forEach(element => {
        $('tbody').append(templateRow(element));
    });

    $('#form-cadastro').on('submit', function(event) {
        event.preventDefault();
    
        if($('#predio').val() && $('#local').val()) {
            let row = addLocal($('#predio').val(), $('#local').val())
            
            $('tbody').append(templateRow(row))
            return;
        }

        alert("Verifique os campos obrigatórios!");
    });

    $(document).on('click', '.edit', function() {
        let id = $(this).data('id');

        $(`tr#${id}`).html(templateDataEdit(arrLocaisTrabalho.find(local => local.id == id)));
    });

    $(document).on('click', '.delete', function() {
        let id = $(this).data('id');

        delLocal(id);

        $(`tr#${id}`).remove();
    });

    $(document).on('click', '.save', function() {
        let id = $(this).data('id');
        
        $(`tr#${id}`).html(templateData(upLocal(id, $(`#predio${id}`).val(), $(`#local${id}`).val())));
    });
}

function getArray() {
    let arr = sessionStorage.getItem('obuc.locais_trabalho');
    
    return arr ? JSON.parse(sessionStorage.getItem('obuc.locais_trabalho')) : [];
}

function addLocal(predio, local) {
    let item = {
        id: Date.now(),
        predio,
        local
    };

    arrLocaisTrabalho.push(item)

    sessionStorage.setItem('obuc.locais_trabalho', JSON.stringify(arrLocaisTrabalho));

    return item;
}

function delLocal(id) {
    arrLocaisTrabalho.splice(arrLocaisTrabalho.findIndex(local => local.id == id), 1)

    sessionStorage.setItem('obuc.locais_trabalho', JSON.stringify(arrLocaisTrabalho));
}

function upLocal(id, predio, local) {
    let item = arrLocaisTrabalho.find(local => local.id == id);

    item.predio = predio;
    item.local = local;

    sessionStorage.setItem('obuc.locais_trabalho', JSON.stringify(arrLocaisTrabalho));

    return item;
}

function templateRow(row) {
    return `
        <tr id="${row.id}">
            <td>${row.predio}</td>
            <td>${row.local}</td>
            <td>
                <i data-id="${row.id}" class="fas fa-pen edit"></i>
                <i data-id="${row.id}" class="fas fa-trash-alt delete"></i>
            </td>
        </tr>
    `;
}

function templateData(row) {
    return `
        <td>${row.predio}</td>
        <td>${row.local}</td>
        <td>
            <i data-id="${row.id}" class="fas fa-pen edit"></i>
            <i data-id="${row.id}" class="fas fa-trash-alt delete"></i>
        </td>
    `;
}

function templateDataEdit(row) {
    return `
        <td>
            <div>
                <select id="predio${row.id}" name="predio">
                    <option value="">Escolha um prédio</option>
                    <option value="Prédio 1" ${row.predio == "Prédio 1" ? "selected" : ""}>Prédio 1</option>
                    <option value="Prédio 2" ${row.predio == "Prédio 2" ? "selected" : ""}>Prédio 2</option>
                    <option value="Prédio 3" ${row.predio == "Prédio 3" ? "selected" : ""}>Prédio 3</option>
                </select>
            </div>
        </td>
        <td>
            <input type="text" id="local${row.id}" value="${row.local}" name="local">
        </td>
        <td>
            <i data-id="${row.id}" class="fas fa-save save"></i>
        </td>
    `
}