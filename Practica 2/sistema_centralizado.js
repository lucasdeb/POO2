class sistema_centralizado{
    constructor(){
        this.recargas_pendientes=[];
    }

    cargarTarjeta(id, monto){
        this.recargas_pendientes.push([id,monto]);
        return this.recargas_pendientes;
    }

    acreditarSaldo(tarjeta){
        const recargas = this.recargas_pendientes.filter( carga => carga[0] === tarjeta.id);
        
        recargas.map((cargaFiltrada) => {
            tarjeta.cargarSaldo(cargaFiltrada[1]);
            this.recargas_pendientes.splice(this.recargas_pendientes.indexOf(cargaFiltrada),1);
        });
    }

    cantidadRecargasPendientes(){
        return this.recargas_pendientes.length;
    }
}

module.exports = sistema_centralizado;