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

    public WBlob wImagen() {
        if (this.idWImagen == null) {
            return null;
        }
        return WBlob.findById(this.idWImagen);
    }

}
