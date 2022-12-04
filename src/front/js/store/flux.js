const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      email: "",
      textFile: null, //creating storage for the files we will work with and return
      textArray: null,
      displayText: null,
      message: null,
      verifiedUser: false,
      newUser: false,
      token: "",
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
      newUser: () => {
        setStore({ newUser: true });
      },
      setFile: (fileName) => {
        //needs to call API to send it to backend
        setStore({ textFile: fileName });
      },
      handlePaste: (txt) => {
        setStore({ textArray: txt });
      },
      signOut: () => {
        setStore({ token: "", verifiedUser: false, email: "", newUser: false });
      },
      createUser: async (mail, pass) => {
        await fetch(process.env.BACKEND_URL + "/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: mail,
            password: pass,
            is_active: true,
          }),
          // /* redirect: "follow", */
        })
          .then((response) => response.json())
          .then((result) => {
            setStore({ email: mail })
            console.log("this is the result", result)
          })
          .catch((err) => console.log("this is the error: ", err));
      },
      getToken: async (email, password) => {
        await fetch(process.env.BACKEND_URL + "/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          redirect: "follow",
        })
          .then((response) => response.json())
          .then((result) =>
            setStore({ token: result.access_token, email: email })
          )
          .catch((err) => console.log(err));
      },
      getVerified: async () => {
        await fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + getStore().token,
          },
          redirect: "follow",
        })
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      },
    },
  };
};

export default getState;
