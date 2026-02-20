package org.eclipse.model.core.api;

import java.util.List;

import org.eclipse.model.core.entities.Dispositivo;
import org.eclipse.model.core.service.DispositivoService;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/dispositivos")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class DispositivoRest {

    @Inject
    private DispositivoService service; // Inyección del EJB

    @GET
    public List<Dispositivo> listar() {
        return service.listarTodos();
    }

    @GET
    @Path("/{id}")
    public Response buscar(@PathParam("id") Long id) {
        Dispositivo d = service.buscarPorId(id);
        return d != null ? Response.ok(d).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    public Response crear(Dispositivo d) {
        try {
            service.insertar(d);
            return Response.status(Response.Status.CREATED).entity(d).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PUT
    public Response actualizar(Dispositivo d) {
        service.actualizar(d);
        return Response.ok(d).build();
    }

    @DELETE
    @Path("/{id}")
    public Response eliminar(@PathParam("id") Long id) {
        service.eliminar(id);
        return Response.noContent().build();
    }
}