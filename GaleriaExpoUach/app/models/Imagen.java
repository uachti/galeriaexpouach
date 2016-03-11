package models;

import com.google.code.morphia.annotations.Entity;
import com.google.code.morphia.annotations.PrePersist;
import com.google.code.morphia.annotations.Transient;
import org.bson.types.ObjectId;
import play.data.validation.Required;
import play.modules.morphia.Model;

/**
 * Modelo de una imagen.
 *
 * @author Edgar Hiram Hernández Reyes
 * @since Mar 9, 2016
 * @version 1
 */
@Entity
public class Imagen extends Model {

    @Transient
    public WBlob wImagen;

    public ObjectId idWImagen;

    @Required
    public String imagenBase64;

    public String descripcion;

    /**
     * Constructor de una nueva {@code Imagen}.
     */
    public Imagen() {
    }

    @PrePersist
    private void setWBlobId() {
        ObjectId tempId;
        if (this.wImagen != null && (tempId = this.wImagen.getId()) != null) {
            this.idWImagen = tempId;
        }
    }

    /**
     * Interceptor. Antes de borrar una {@code Imagen}, se borra también el
     * {@code WBlob} relacionado
     */
    @OnDelete
    private void deleteWImagen() {
        WBlob wImagenToDelete = wImagen();
        if (wImagenToDelete != null) {
            if (wImagenToDelete.file != null && wImagenToDelete.file.exists()) {
                wImagenToDelete.file.delete();
            }
            wImagenToDelete.delete();
        }
    }

    /**
     * Devuelve el {@code WBlob} correspondiente a {@link Imagen#idWImagen};
     *
     * @return {@code WBlob} correspondiente
     */
    public WBlob wImagen() {
        if (this.idWImagen == null) {
            return null;
        }
        return WBlob.findById(this.idWImagen);
    }

}
