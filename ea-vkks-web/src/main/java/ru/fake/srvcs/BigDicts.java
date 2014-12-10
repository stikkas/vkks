package ru.fake.srvcs;

import java.util.List;
import ru.fake.answer.Fio;
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
		/*
		 List<String> fios = store.getFios(query);

		 Fio[] result = new Fio[fios.size()];
		 for (int i = 0; i < result.length; ++i) {
		 result[i] = new Fio(fios.get(i));
		 }
		 return result;
		 */
		return store.getFios(query);
	}
}
