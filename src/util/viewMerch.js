export function showMerchant() {

    var table = document.getElementById('MerchantTable');

    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function() {

            document.getElementById("merchantId").value = this.cells[1].innerHTML;
            document.getElementById("merchantName").value = this.cells[2].innerHTML;
            document.getElementById("accountNumber").value = this.cells[3].innerHTML;
            document.getElementById("rIndex").value = this.rowIndex;
            console.log("onclick : " + this.rowIndex);
        };
    }

};