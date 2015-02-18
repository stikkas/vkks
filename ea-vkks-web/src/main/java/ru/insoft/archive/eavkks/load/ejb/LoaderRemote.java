package ru.insoft.archive.eavkks.load.ejb;

import javax.ejb.Remote;

/**
 *
 * @author Благодатских С.
 */
@Remote
interface LoaderRemote {
	String load(String srcDir);
}
