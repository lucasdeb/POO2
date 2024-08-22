class TarjetaSube {
    static saldo_min = -600;
    constructor(id){
        this.saldo = 0;
        this.id = id;
    }

    obtenerSaldo() {
        return this.saldo
    }

    cargarSaldo(monto){
        return this.saldo += monto
    }

    pagarViaje(monto){
       if (this.saldo - monto < TarjetaSube.saldo_min){
        throw new Error("Saldo insuficiente.");
       }
       this.saldo -= monto;
    }
}

module.exports = TarjetaSube;