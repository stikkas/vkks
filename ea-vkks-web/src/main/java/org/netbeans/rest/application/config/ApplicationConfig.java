package org.netbeans.rest.application.config;

import java.util.Set;
import javax.ws.rs.core.Application;

/**
 *
 * @author С. Благодатских
 */
@javax.ws.rs.ApplicationPath("fake")
public class ApplicationConfig extends Application {

	@Override
	public Set<Class<?>> getClasses() {
		Set<Class<?>> resources = new java.util.HashSet<Class<?>>();
		addRestResourceClasses(resources);
		return resources;
	}

	/**
	 * Do not modify addRestResourceClasses() method. It is automatically
	 * populated with all resources defined in the project. If required, comment
	 * out calling this method in getClasses().
	 */
	private void addRestResourceClasses(Set<Class<?>> resources) {
		resources.add(ru.fake.srvcs.BigDicts.class);
		resources.add(ru.fake.srvcs.DocumentREST.class);
	}

}
