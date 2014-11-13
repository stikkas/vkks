package ru.insoft.archive.servlets;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author С. Благодатских
 */
@WebServlet("/srvcs/logout")
public class Logout extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest request,
		HttpServletResponse response) throws ServletException, IOException {

		response.setHeader("Cache-Control", "no-cache, no-store");
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Expires", new java.util.Date().toString());
		//
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}

		request.logout();

		response.sendRedirect(request.getContextPath());
	}
}
