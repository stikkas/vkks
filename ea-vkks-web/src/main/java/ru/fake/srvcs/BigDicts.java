package ru.fake.srvcs;

import ru.fake.answer.Fio;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
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
	public Fio[] getFios() {
		String[] fios = store.getFios();
		Fio[] result = new Fio[fios.length];
		for (int i = 0; i < fios.length; ++i) {
			result[i] = new Fio(fios[i]);
		}
		return result;
	}
}
