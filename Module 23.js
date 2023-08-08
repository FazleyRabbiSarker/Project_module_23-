<?php

require_once ('vendor/autoload.php');

$dotenv = \Dotenv\Dotenv::createImmutable(__DIR__ . '../../../');
$dotenv->load();

$localhost = $_ENV["LOCALHOST"];
$username = $_ENV["AMOUNT"];
$password = $_ENV["DESCRIPTION"];
$database = $_ENV["DATE"];
$database = $_ENV["CATEGORY"];

var_dump($username);

?>

---------------------------------
LOGIN:
use Illuminate\Support\Facades\Auth;

// Retrieve the currently authenticated user...
$user = Auth::user();

// Retrieve the currently authenticated user's ID...
$id = Auth::id();

<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    /**
     * Update the flight information for an existing flight.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();

        // ...

        return redirect('/flights');
    }
}

Route::get('/flights', function () {
    // Only authenticated users may access this route...
})->middleware('auth');

use Illuminate\Http\Request;

/**
 * Get the path the user should be redirected to.
 */
protected function redirectTo(Request $request): string
{
    return route('login');
}


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Handle an authentication attempt.
     */
    public function authenticate(Request $request): RedirectResponse
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('dashboard');
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }
}
use Illuminate\Database\Eloquent\Builder;

if (Auth::attempt([
    'email' => $email,
    'password' => $password,
    fn (Builder $query) => $query->has('activeSubscription'),
])) {
    // Authentication was successful...
}
--------------------------------------------------------------------------
class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        Validator::extend('greater_than_field', function($attribute, $value, $parameters, $validator) {
            $min_field = $parameters[0];
            $data = $validator->getData();
            $min_value = $data[$min_field];
            return $value > $min_value;
        });

        Validator::replacer('greater_than_field', function($message, $attribute, $rule, $parameters) {
            return str_replace(':field', $parameters[0], $message);
        });
    }
}

(function($) {
    "use strict"; // Start of use strict

    // Toggle the side navigation
    $("#sidebarToggle").on('click', function(e) {
        e.preventDefault();
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
        if ($(window).width() > 768) {
            var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
    });

    // Scroll to top button appear
    $(document).on('scroll', function() {
        var scrollDistance = $(this).scrollTop();
        if (scrollDistance > 100) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    });

    // Smooth scrolling using jQuery easing
    $(document).on('click', 'a.scroll-to-top', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict

// Calculator JS
var Controller = (function(){
    //Global Variable
    var val, stackArr, total;

    val = '';
    stackArr = [];
    total = 0;

    //------------------------------------------------------------------
    //DOM Element Ref.
    var DOM = {
        summery: document.querySelector('.calculator__summery'),
        stack: document.querySelector('.calculator__stack')
    }
    //------------------------------------------------------------------
    //function : Clear UI
    var clearUI = function(){
        total = 0;
        stackArr = [];
        DOM.summery.textContent = "0";
        DOM.stack.textContent = "0";
    }
    //------------------------------------------------------------------
    //function : format Number (turn 5000 --> 5,000.00)
    var formatNum = function(num){

        num = Math.abs(num);
        num = num.toFixed(2);
        var numSplit = num.split(".");
        ;
        var int = parseInt(numSplit[0]);
        var dec = numSplit[1];

        return int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.' + dec;
    }

    //------------------------------------------------------------------
    //Main Function : check operator on click
    var checkOps = function(){
        if(val){

            // btn -> " = " btn
            if(val === "sum"){
                var merge = document.querySelector('.calculator__stack').innerHTML;
                total = eval(merge);
                DOM.stack.textContent = "0";
                DOM.summery.textContent = formatNum(total);
                stackArr = [];
                stackArr.push(total);

                // btn -> " del "
            }else if(val === "del"){
                stackArr.pop();
                stackArr.length === 0 ?  DOM.stack.textContent = "0" : DOM.stack.textContent = stackArr.join('');

                // btn -> " C "
            }else if(val === "clear"){
                clearUI();

                // btn -> " CE "
            }else if(val === "clear-entry"){
                DOM.summery.textContent = formatNum(total);
                DOM.stack.textContent = "0";
                stackArr = [];
                stackArr.push(total);

                // btn -> (Number , ". [dot]")
            }else{
                stackArr.push(val);
                DOM.summery.textContent = "0";
                DOM.stack.textContent = stackArr.join('');
            }
        }
    }

    //------------------------------------------------------------------
    // EventLister : Setup
    var getEvent = function(){
        document.addEventListener('click', function(e){
            // 1. get Value form html
            val = e.target.getAttribute('value');
            // 2. Call checkOps method
            checkOps();
        });
    }

    //------------------------------------------------------------------

    return{
        init: function(){
            //1. Cennect with Script.js
            console.log("Script.js : connecting... ");
            //2. Clear UI prepare for process
            clearUI();
            //3. Call method : Main System
            getEvent();
        }
    }
})();

//Start Program
Controller.init();
---------------------------------
$conn = mysqli_connect('localhost', 'root', '');
if (! $conn) {
    die("Connection failed" . mysqli_connect_error());
}
else {
    mysqli_select_db($conn, 'pagination');
}
if (!isset ($_GET['page']) ) {
    $page = 1;
} else {
    $page = $_GET['page'];
}
<html>
<head>
<title> Pagination </title>
</head>
<body>

<?php

    //database connection
    $conn = mysqli_connect('localhost', 'root', '');
    if (! $conn) {
die("Connection failed" . mysqli_connect_error());
    }
    else {
mysqli_select_db($conn, 'pagination');
    }

    //define total number of results you want per page
    $results_per_page = 10;

    //find the total number of results stored in the database
    $query = "select *from alphabet";
    $result = mysqli_query($conn, $query);
    $number_of_result = mysqli_num_rows($result);

    //determine the total number of pages available
    $number_of_page = ceil ($number_of_result / $results_per_page);

    //determine which page number visitor is currently on
    if (!isset ($_GET['page']) ) {
        $page = 1;
    } else {
        $page = $_GET['page'];
    }

    //determine the sql LIMIT starting number for the results on the displaying page
    $page_first_result = ($page-1) * $results_per_page;

    //retrieve the selected results from database
    $query = "SELECT *FROM alphabet LIMIT " . $page_first_result . ',' . $results_per_page;
    $result = mysqli_query($conn, $query);

    //display the retrieved result on the webpage
    while ($row = mysqli_fetch_array($result)) {
        echo $row['id'] . ' ' . $row['alphabet'] . '</br>';
    }


    //display the link of the pages in URL
    for($page = 1; $page<= $number_of_page; $page++) {
        echo '<a href = "index2.php?page=' . $page . '">' . $page . ' </a>';
    }

?>
</body>
</html>
------------------------------------------------------------------------------------
<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;


$(document).ready(function() {

	/* If localStorage values exist, apply them right away after document loads. */
	window.localStorage.getItem('salary') !== null ? $('#Salary').val(window.localStorage.getItem('salary')) : '';
	window.localStorage.getItem('taxRate') !== null ? $('#TaxRate').val(window.localStorage.getItem('taxRate')) : "";
	window.localStorage.getItem('retirementFund') !== null ? $('#RetirementContribution').val(window.localStorage.getItem('retirementFund')) : "";
	window.localStorage.getItem('expenses') !== null ? $('#Expenses').val(window.localStorage.getItem('expenses')) : "";

	/* Calculator function begins */
	var SalaryToPaycheck = function() {
		// Where the calculation is output
		var netIncomeElement = $('#NetMonthlyIncome');

		// User Salary
		var salary = $('#Salary').val();

		// Estimated tax rate
		var taxRate = parseFloat($('#TaxRate').val()) / 100;

		// Percentage contributed to 401k
		var retirementFund = parseFloat($('#RetirementContribution').val()) / 100;

		// Optional Expense input to be used to calculate further.
		var expenses = $('#Expenses').val();

		//The combined values to be subtracted from the salary
		this.offTheTop =
			(retirementFund * salary) +
			(taxRate * salary);

		var netIncome = (parseFloat((salary - this.offTheTop) / 12).toFixed(2));
		var netIncomeOutput; // Placeholder

		var surplusIncome = parseFloat(netIncome - expenses).toFixed(2)
		var surplusOutput; // placeholder

		// Rudimentary form validation...because i'm lazy today.
		if (isNaN(netIncome) || salary == "") {
			netIncomeOutput = netIncomeElement.val('Fill out all fields and follow syntax example').css('color', 'red');
		} else {
			$('.wrap-dollar1, .wrap-dollar2').toggleClass('spin');
			$('.hammer').addClass('hammerTime');
			netIncomeOutput = netIncomeElement.val(netIncome).css('color', '#333333');
			if (expenses == "") {
				$('#NetMonthlySurplus').val() == "";
			} else {
				surplusOutput = $('#NetMonthlySurplus').val(surplusIncome);
			}

			/* STORING VALUES IN LOCAL STORAGE AFTER SUCCESFUL "VALIDATION" */
			window.localStorage.setItem('salary', salary);
			window.localStorage.setItem('taxRate', $('#TaxRate').val());
			window.localStorage.setItem('retirementFund', $('#RetirementContribution').val());
			window.localStorage.setItem('expenses', expenses);

		}

		/* No need to return a value  */

	};

	// Calling the function on click/submit
	$('#Calculate').click(function(e) {
		e.preventDefault();
		SalaryToPaycheck();
		$(this).focus();
	});

	// On reset, remove MC Hammer and reset focus to first field.
	$("[type=reset]").click(function() {
		$('#Salary').focus();
		$('.hammer').removeClass('hammerTime');
	});

});
------------------------------------------------------------------------------------------------------

const User = require("../models/User");
const ExpenseTransaction = require("../models/ExpenseTransaction");

let addExpense = async (req, res) => {
  try {
    let newTransaction = new ExpenseTransaction(req.body);
    let user = await User.findById(req.auth.id);
    newTransaction.user = user;
    let category = user.expense_categories.find(
      category => category.name === req.body.category.name.trim()
    );

    if (!category) {
      user.expense_categories.push(req.body.category);
      await user.save();
      category = user.expense_categories.find(
        category => category.name === req.body.category.name.trim()
      );
    }

    newTransaction.category = category;
    await newTransaction.save();
    return res.json(newTransaction);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
};

let editExpense = async (req, res) => {
  try {
    let expense = await ExpenseTransaction.findById(
      req.params.expenseId
    ).populate("user", "id");

    if (!expense) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    let hasAuthorization = expense.user.id == req.auth.id;
    if (!hasAuthorization) {
      return res.status(401).json({ error: "You don't have permission" });
    }

    expense = await ExpenseTransaction.findByIdAndUpdate(
      req.params.expenseId,
      { $set: req.body },
      { new: true }
    );

    return res.json(expense);
  } catch (e) {
    console.log(e);
    res.status(400).json({ error: e });
  }
};

let deleteExpense = async (req, res) => {
  try {
    let expense = await ExpenseTransaction.findById(
      req.params.expenseId
    ).populate("user", "id");

    if (!expense) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    let hasAuthorization = expense.user.id == req.auth.id;
    if (!hasAuthorization) {
      return res.status(401).json({ error: "You don't have permission" });
    }

    await expense.remove(req.params.expenseId);

    return res.json({ success: true });
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
};

getExpense = async (req, res) => {
  try {
    if (req.params.expenseId) {
      let expense = await ExpenseTransaction.findById(
        req.params.expenseId
      ).populate("user", "id");
      let hasAuthorization = expense && expense.user.id == req.auth.id;
      if (!hasAuthorization) {
        return res.status(401).json({
          error:
            "Could not find the transaction or you don't have the permission"
        });
      } else {
        return res.json(expense);
      }
    } else {
      let expenses = await ExpenseTransaction.find({
        user: await User.findById(req.auth.id)
      });

      return res.json(expenses);
    }
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: e });
  }
};

module.exports = {
  addExpense,
  editExpense,
  deleteExpense,
  getExpense
};


const jwt = require("jsonwebtoken");
const { secretOrKey } = require("../config/keys");
const expressJwt = require("express-jwt");
const User = require("../models/User");

let requireSignin = expressJwt({
  secret: secretOrKey,
  requestProperty: "auth"
});

let validateToken = (req, res) => {
  if (req.user) {
    let token = jwt.sign(
      {
        id: req.user.id
      },
      secretOrKey,
      {
        expiresIn: 60 * 60 * 6
      }
    );

    return res.json({
      user: req.user,
      jwt: token
    });
  } else {
    res.status(401).json({ error: "Validation failed" });
  }
};

let validateUser = async (req, res) => {
  try {
    let user = await User.findById(req.auth.id);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: JSON.stringify(err) });
  }
};

module.exports = { requireSignin, validateToken, validateUser };


const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const expenseTransactionSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  category: { name: String, color: String },
  amount: Number,
  account: String,
  comment: String,
  type: {
    type: String,
    default: "Expense"
  }
});

module.exports = mongoose.model("ExpenseTransaction", expenseTransactionSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const incomeTransactionSchema = new Schema({
  user: { type: ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  category: { name: String, color: String },
  amount: Number,
  account: String,
  comment: String,
  type: {
    type: String,
    default: "Income"
  }
});

module.exports = mongoose.model("IncomeTransaction", incomeTransactionSchema);
------------------------------------------------------------------------------------------

div.ex1 {
  margin: 20px;
  border: 1px solid black;
  outline: 4px solid red;
  outline-offset: 15px;
}

div.ex2 {
  margin: 10px;
  border: 1px solid black;
  outline: 5px dashed blue;
  outline-offset: 5px;
}
body { background-color: #1e90ff; }

h2 { border-bottom: 2px solid #1e90ff; }

.container {
  color: #1e90ff;
  background-color: #ffffff;
  padding: 15px;
}

button {
  background-color: #ffffff;
  color: #1e90ff;
  border: 1px solid #1e90ff;
  padding: 5px;
}
<script>
// Get the root element
var r = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  alert("The value of --blue is: " + rs.getPropertyValue('--blue'));
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  r.style.setProperty('--blue', 'lightblue');
}
</script>

  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* Position the tooltip text - see examples below! */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>

<div class="tooltip">Hover over me
  <span class="tooltiptext">Tooltip text</span>
</div>

#div1 {
  background: url(img_flower.jpg);
  background-size: contain;
  background-repeat: no-repeat;
}

#div2 {
  background: url(img_flower.jpg);
  background-size: cover;
  background-repeat: no


