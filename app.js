new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], 
        esJugador: false,
        texto: '',
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            this.hayUnaPartidaEnJuego = true;
            this.saludJugador= 100,
            this.saludMonstruo= 100
        },

        atacar: function () {
            var daño = this.calcularHeridas(3,10);
            this.saludMonstruo-= daño;

            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador golpea al monstruo por ' + daño
            });

            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();
        },

        ataqueEspecial: function () {
            var daño = this.calcularHeridas(10,20);
            this.saludMonstruo-=daño;

            if(this.verificarGanador()){
                return;
            }

            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador golpea con ataque especial al monstruo por ' + daño
            });    

            this.ataqueDelMonstruo();
        },

        curar: function () {
            if(this.saludJugador<=90){
                this.saludJugador +=10;
            }else{
                this.saludJugador = 100;
            }

            this.registrarEvento({
                esJugador: true,
                texto: 'El jugador se curo 10 puntos'
            });
           
            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
            this.turnos.unshift(evento);
        },

        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.saludJugador= 100,
            this.saludMonstruo= 100
        },

        ataqueDelMonstruo: function () {
            var daño = this.calcularHeridas(5,12)
            console.log("Ataque monstruo "+daño);
            this.saludJugador-=daño;
            
            this.registrarEvento({
                esJugador: false,
                texto: 'El monstruo lastima al jugador en ' + daño
            });

            this.verificarGanador();
        },

        calcularHeridas: function (min, max) {
            return Math.max(Math.floor(Math.random()*max)+1,min);

        },
        verificarGanador: function () {
            if(this.saludMonstruo <= 0){
                if(confirm('Ganaste! Jugar de nuevo?')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            } else if (this.saludJugador <=0){
                if(confirm('Perdiste! Jugar de nuevo?')){
                    this.empezarPartida();
                } else {
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;
            }
            return false;
        },
    }
});