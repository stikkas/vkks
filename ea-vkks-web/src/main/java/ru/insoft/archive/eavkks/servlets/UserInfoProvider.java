/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package ru.insoft.archive.eavkks.servlets;

import javax.inject.Inject;
import javax.servlet.annotation.WebServlet;
import ru.insoft.archive.extcommons.ejb.JsonTools;
import ru.insoft.archive.extcommons.ejb.UserInfo;

/**
 *
 * @author melnikov
 */
@WebServlet("/srvcs/user")
public class UserInfoProvider extends ru.insoft.archive.extcommons.servlet.UserInfoProvider
{
    @Inject
    JsonTools jsonTools;
    @Inject
    UserInfo userInfo;

    @Override
    protected UserInfo getUserInfo() 
    {
        return userInfo;
    }

    @Override
    protected JsonTools getJsonTools() 
    {
        return jsonTools;
    }
    
}
