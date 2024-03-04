import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import moment from "moment";
import Navigation from "./components/navigation/Navigation";
import Landing from "./routes/landing/Landing";
import Footer from "./components/footer/Footer";
import Contact from "./routes/contact/Contact";
import Pricing from "./routes/pricing/Pricing";
import Faq from "./routes/faq/Faq";
import Blog from "./routes/blog/Blog";
import About from "./routes/about/About";
import Terms from "./routes/terms/Terms";
import Refunds from "./routes/refunds/Refunds";
import Privacy from "./routes/privacy/Privacy";
import Jobs from "./routes/jobs/Jobs";
import SignIn from "./routes/sign-in/SignIn";
import SignUp from "./routes/sign-up/SignUp";
import BlogPost from "./routes/blog-post/BlogPost";
//Airtable
import edgyBase from "./airtable/airtable";
import { useEffect, useState } from "react";
//uuid
import { v4 as uuidv4 } from 'uuid';
import Profile from "./routes/user-profile/Profile";
import NotFound from "./components/NotFound";

export default function App() {
  const [user, setUser] = useState({ id: '', createdTime: '', email: '', fullname: '', gender: '', plan: '', password: '' });
  const [loggedIn, setLoggedIn] = useState(false);
  const [triggeredLogout, setTriggeredLogout] = useState(false);

  const saveSession = () => {
    if (sessionStorage.getItem('loggedIn') !== null) {
      return;
    }
    if (sessionStorage.getItem('loggedIn') === null) {
      sessionStorage.setItem('loggedIn', true);
    }
  };


  //Working with sessions storage every time the website reloads
  useEffect(() => {
    //if use logged in AND login session isn't saved AND logout wasn't triggered THEN save the login session
    if (loggedIn && sessionStorage.getItem('loggedIn') === null && !triggeredLogout) {
      saveSession();
    }
    //if user triggered logout AND we have login session in the storage THEN remove this sessions
    if (triggeredLogout && sessionStorage.getItem('loggedIn') !== null) {
      sessionStorage.removeItem('loggedIn');
    }
    //there is login session in the storage AND it wasn't the trigger of the logout THEN retrieve the sessions from the storage
    if (sessionStorage.getItem('loggedIn') !== null && !triggeredLogout) {
      setLoggedIn(sessionStorage.getItem('loggedIn'));
    }
  }, [loggedIn, triggeredLogout]);


  const retrieveDatabase = async (email, password = undefined) => {
    try {
      const response = await fetch(process.env.REACT_APP_AIRTABLE_SERVER_URL);
      const data = await response.json();
      // if I found the matching email in the database
      if (password === undefined) {
        // if I found the matching email in the database
        if (Object.keys(data.records.filter((record) => record.fields.email === email)[0]).length > 0) {
          const theUser = data.records.filter((record) => record.fields.email === email)[0];
          setUser({ id: theUser.id, createdTime: moment(theUser.createdTime).utc().format('YYYY-MM-DD'), email: theUser.fields.email, fullname: theUser.fields.fullname, gender: theUser.fields.gender, plan: theUser.fields.plan, password: theUser.fields.password });
          return true;
        }
        //if I didn't find the matching email on the database
        else {
          return false;
        }
      }
      //if I provided password
      if (password !== undefined) {
        const targetUser = data.records.filter((record) => record.fields.email === email)[0];
        if (targetUser.fields.password === password) {
          setUser({ id: targetUser.id, createdTime: moment(targetUser.createdTime).utc().format('YYYY-MM-DD'), email: targetUser.fields.email, fullname: targetUser.fields.fullname, gender: targetUser.fields.gender, plan: targetUser.fields.plan, password: targetUser.fields.password });
          return true;
        }
        else {
          return false;
        }
      }

    }
    catch (err) {
      return false;
    }
  }

  const registerUser = async (data) => {
    const { email, password, fullname } = data;
    const id = uuidv4();
    const checkUser = await retrieveDatabase(data.email.toLowerCase());

    if (checkUser) {
      return false;
    }
    if (checkUser === false) {
      try {
        edgyBase('users').create([
          {
            "fields": {
              "id": id,
              "email": email.toLowerCase(),
              "password": password,
              "fullname": fullname,
            }
          },
        ]
        );
        return true;
      }
      catch (error) {
        console.error(error);
      }
    }

  }

  const updateUser = (userId, formValue) => {
    //destructure incoming data
    const key = Object.keys(formValue)[0];
    const value = Object.values(formValue)[0];
    const form = {
      [key]: value,
    }
    //Update user info
    edgyBase('users').update([
      {
        "id": userId,
        "fields": form
      }
    ]
      , function (error) {
        if (error) {
          console.log(`Message: ${error.message} | Code: ${error.statusCode}`);
          return;
        }
        else {
          return true;
        }
      }

    );
    setUser({ ...user, [key]: value });
  }




  const deleteUser = (userId) => {
    edgyBase('users').destroy([userId], function (err, deletedRecords) {
      if (err) {
        console.error(err);
        return;
      }
    });
    setLoggedIn(false);
  }

  return (
    <Router>
      <Navigation loggedIn={loggedIn} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} />
      <Routes>
        <Route path="/" element={<Landing loggedIn={loggedIn} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing loggedIn={loggedIn} />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:name" element={<BlogPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<Refunds />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/sign-in" element={loggedIn ? <Profile retrieveDatabase={retrieveDatabase} user={user} updateUser={updateUser} deleteUser={deleteUser} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} /> : <SignIn retrieveDatabase={retrieveDatabase} user={user} setLoggedIn={setLoggedIn} />} />
        <Route path="/sign-up" element={loggedIn ? <Profile retrieveDatabase={retrieveDatabase} user={user} updateUser={updateUser} deleteUser={deleteUser} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} /> : <SignUp retrieveDatabase={retrieveDatabase} user={user} registerUser={registerUser} />} />
        <Route path="/profile" element={loggedIn ? <Profile retrieveDatabase={retrieveDatabase} user={user} updateUser={updateUser} deleteUser={deleteUser} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} /> : <NotFound />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}