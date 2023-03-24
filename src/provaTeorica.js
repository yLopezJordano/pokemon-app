class RegisteredUser{
    
    constructor(services = []) {
        this.services = services
    }
    _getMultimediaContent(service) {
        return service.getMultimediaContent();
    }
    getTotal () {
        let total = 0

        this.services.forEach((service) => {
            let multimediaContent = this._getMultimediaContent(service);

            if (instanceof service == StreamingService) {
                total += multimediaContent.streamingPrice
            } else if (instanceof service == DownloadService) {
                total += multimediaContent.downloadPrice
            }

            if (instanceof multimediaContent == PremiumContent) {
                total += multimediaContent.aditionalFee
            }
        })

        return total
    }
}

/*

Verificar el tipo de servicio mediante el uso del operador instanceof en lugar de typeof.
El operador instanceof es más preciso que typeof,
ya que comprueba si un objeto es una instancia de
una clase en particular en lugar de simplemente verificar su tipo.

Añadir un método separado para obetener multimediaContent a la clase RegisteredUser en vez de cogerlo
directamente de service

Tambien sacaria index del forEach porque no parece que se vaya a dar uso.

*/