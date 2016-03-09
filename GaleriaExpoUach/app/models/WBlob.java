package models;

import com.google.code.morphia.annotations.Entity;
import play.modules.morphia.Blob;
import play.modules.morphia.Model;

/**
 * Modelo wrapper de un Blob, para evitar cargar automáticamente todos los Blobs
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
@Entity
public class WBlob extends Model {

    public Blob file;

    /**
     * Constructor de un nuevo {@code WBlob}.
     */
    public WBlob() {
    }

}
