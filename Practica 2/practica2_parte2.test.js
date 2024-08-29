const SistemaCentralizado = require("./sistema_centralizado");
const TarjetaSube = require("./tarjetaSube");

describe("Sistema Centralizado", () => {
  let sistemaCentralizado;

  beforeEach(() => {
    sistemaCentralizado = new SistemaCentralizado();
  });

  test("al cargar una tarjeta por primera vez, las recargas pendientes son 1", () => {
    sistemaCentralizado.cargarTarjeta(123,2000);
    
    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
  });

  test("al cargar una tarjeta sube por segunda vez, las recargas pendientes son 2", () => {
    sistemaCentralizado.cargarTarjeta(123,2000);
    sistemaCentralizado.cargarTarjeta(123,2000);

    expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(2);
  });

  describe("al acreditar una recarga", () => {
    let tarjetaSube;
    const identificador = 123;
    const id2 = 124;
    const id3 = 125;

    beforeEach(() => {
      tarjetaSube = new TarjetaSube(identificador);
      tarjetaSube1 = new TarjetaSube(id2);
      tarjetaSube2 = new TarjetaSube(id3);
    });
    
    test("con una sube que no fue cargada, su saldo permanece igual", () => {
      expect(tarjetaSube.obtenerSaldo()).toEqual(0);
    });

    test("con una sube que fue cargada 1 vez, su saldo aumenta en la cantidad cargada", () => {
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(2000);

    });

    test("con una sube que fue cargada 2 veces, su saldo aumenta en la cantidad cargada", () => {
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(tarjetaSube.obtenerSaldo()).toEqual(4000);
    });

    test("cuando una carga es acreditada, las recargas pendientes disminuyen", () => {
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0);
    });

    test("cuando se cargan distintas tarjetas, solo se acreditan las cargas de la tarjeta que corresponde", () => {
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.cargarTarjeta(124,2000);
      sistemaCentralizado.acreditarSaldo(tarjetaSube);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(1);
    });

    test("cuando se acreditan multiples recargas, la cantidad de recargas pendientes disminuye en igual cantidad", () => {
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.cargarTarjeta(124,2000);
      sistemaCentralizado.cargarTarjeta(123,2000);
      sistemaCentralizado.cargarTarjeta(125,5000);
      sistemaCentralizado.acreditarSaldo(tarjetaSube);
      sistemaCentralizado.acreditarSaldo(tarjetaSube1);
      sistemaCentralizado.acreditarSaldo(tarjetaSube2);

      expect(sistemaCentralizado.cantidadRecargasPendientes()).toEqual(0);
    });
  });
});
