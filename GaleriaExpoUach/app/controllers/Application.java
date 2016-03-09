package controllers;


import java.util.*;

import models.*;
import play.*;
import play.modules.morphia.Blob;
import play.modules.morphia.Model;
import play.mvc.*;
import play.templates.JavaExtensions;

public class Application extends Controller {

    public static void index() {
        List<Imagen> imagenes = Imagen.findAll();
        render(imagenes);
    }

    public static void imageFor(String idWImage) {
        WBlob wBlob = WBlob.findById(idWImage);
        notFoundIfNull(wBlob);
        Object file = wBlob.file;
        if (file instanceof Model.BinaryField) {
            Model.BinaryField attachment = (Model.BinaryField) file;
            if (attachment == null || !attachment.exists()) {
                notFound();
            }

//            renderBinary(
//                    attachment.get(),
//                    String.format("%s-%s",
//                            JavaExtensions.slugify(publicacionDocumento.documentName, Boolean.TRUE),
//                            JavaExtensions.slugify(dependencia.toString(), Boolean.TRUE)
//                    ),
//                    attachment.length(),
//                    attachment.type(),
//                    true //Content-Disposition inline
//            );
            response.contentType = attachment.type();
            renderBinary(
                    attachment.get(),
                    idWImage, //HACK: save name?
                    attachment.length(),
                    attachment.type(),
                    true //Content-Disposition inline
            );
        }
        notFound();
    }

}
