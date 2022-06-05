﻿using Microsoft.AspNetCore.Mvc;
using Milestone_cst_350.Models;
using Milestone_cst_350.Services;

namespace Milestone_cst_350.Controllers
{
    public class LoginController : Controller
    {
        private AccountService _accountService = new AccountService();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult ShowLogin(LoginModel login)
        {
            // TODO: Determine if UserModel is just better to use here.
            return _accountService.AuthenticateUser(login) ?
                View("LoginSuccess")
                :
                View("LoginFailure");            
        }
    }
}
