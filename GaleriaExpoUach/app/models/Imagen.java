package models;

import play.data.validation.Required;
import play.modules.morphia.Blob;
import play.modules.morphia.Model;

/**
 * Modelo de una imagen.
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
public class Imagen extends Model {

    @Required
    public String imagenBase64;

    public String descripcion;

    /**
     * Constructor de una nueva {@code Imagen}.
     */
    public Imagen() {
    }

}
