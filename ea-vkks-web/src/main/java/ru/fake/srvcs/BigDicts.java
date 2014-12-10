package ru.fake.srvcs;

import java.util.List;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import ru.fake.store.DB;

/**
 *
 * @author С. Благодатских
 */
@Stateless
@Path("bigdicts")
public class BigDicts {

	@Inject
	DB store;

	@GET
	@Path("users")
	@Produces("application/json")
	public List<String> getFios(@QueryParam("query") String query) {
		return store.getFios(query);
	}

	@GET
	@Path("courts")
	@Produces("application/json")
	public List<String> getCourts(@QueryParam("query") String query) {
		return store.getCourts(query);
	}

}
