const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [{ title: "FIRST", background: "white", initial: "white" },
			{ title: "SECOND", background: "white", initial: "white" }],
			cohorte: 'Spain-91',
			isLogged: false,
			baseURLContact: "https://playground.4geeks.com/contact",
			contacts: [],
			user: "bhgeeky",
			currentContact: {},
			favorites: [],
			currentPagePeople: 1,
			characters: [],
			selectedCharacter: null,
			planets: [],
			selectedPlanet: null,
			starships: [],
			selectedStarship: null,
			hostStarWarsAPI: 'https://swapi.tech/api',


		},
		actions: {
			setIsLogged: (value) => { setStore({ isLogged: value }) },
			setUser: (currentUser) => { setStore({ user: currentUser }) },
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
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
			setCurrentContact: (item) => { setStore({ currentContact: item }) },
			getContacts: async () => {
				// GET
				const uri = `${getStore().baseURLContact}/agendas/${getStore().user}/contacts`;
				const response = await fetch(uri);
				if (!response.ok) {
					console.log('Error:', response.status, response.statusText)
					return
				}
				const data = await response.json();
				setStore({ contacts: data.contacts })
			},
			addContact: async (newData) => {
				// POST
				const uri = `https://playground.4geeks.com/contact/agendas/bhgeeky/contacts`
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(newData)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					//tratamos el error
					console.log('error:', response.status, response.statusText)
					return
				}
				getActions().getContacts()
			},
			editContact: async (dataContact, id) => {
				// PUT	
				const uri = `https://playground.4geeks.com/contact/agendas/bhgeeky/contacts/${id}`;
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(dataContact)
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					//tratamos el error
					console.log('error:', response.status, response.statusText)
					return
				}
				getActions().getContacts();
				getActions().setCurrentContact({})
			},
			deleteContact: async (id) => {
				//DELETE
				const uri = `https://playground.4geeks.com/contact/agendas/bhgeeky/contacts/${id}`
				const options = {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('error:', response.status, response.statusText)
					return
				};
				getActions().getContacts();
			},
				// STARS WARS
				
				getCharacters: async () => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch("https://www.swapi.tech/api/people/", options)
						if (!response.ok) {
							console.error("Fetch error getCharacters")
						}
						const data = await response.json()
						setStore({ characters: data["results"] })
					}
					catch (error) {
						console.error("Failed to get getCharacters")
					}
				},
				characterDetails: async (id) => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch(`https://www.swapi.tech/api/people/${id}`, options)
						if (!response.ok) {
							console.error("Fetch error characterDetails")
						}
						const data = await response.json()
						setStore({ selectedCharacter: data.result.properties })
					}
					catch (error) {
						console.error("Failed to get characterDetails")
					}
				},
				// PLANETS
				getPlanets: async (id) => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch("https://www.swapi.tech/api/planets/", options)
	
						if (!response.ok) {
							console.error("Fetch error getPlanets");
							return;
						}
						const data = await response.json();
						setStore({ planets: data["results"] })
					}
					catch (error) {
						console.error("Failed to get getPlanets")
					}
				},
				planetDetails: async (id) => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch(`https://www.swapi.tech/api/planets/${id}`, options)
						if (!response.ok) {
							console.error("Fetch error characterDetails")
						}
						const data = await response.json()
						setStore({ selectedPlanet: data.result.properties })
					}
					catch (error) {
						console.error("Failed to get characterDetails")
					}
				},
				// STARSHIPS
				getVehicles: async () => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch("https://www.swapi.tech/api/vehicles/", options)
						if (!response.ok) {
							console.error("Fetch error getVehicles")
						}
						const data = await response.json()
						setStore({ starships: data["results"] })
					}
					catch (error) {
						console.error("Failed to get getVehicles")
					}
				},
				starshipDetails: async (id) => {
					try {
						const options = { method: 'GET', headers: {} };
						const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}`, options)
						if (!response.ok) {
							console.error("Fetch error characterDetails")
						}
						const data = await response.json()
						setStore({ selectedStarship: data.result.properties })
					}
					catch (error) {
						console.error("Failed to get characterDetails")
					}
				},
				// FAVOURITES
				addFavourite: (item) => {
					const store = getStore()
					console.log("Current store:", store);
					if (!store.favorites.includes(item)) {
						setStore({ favorites: [...store.favorites, item] })
					}
				},
				deleteFavourite: (index) => {
					const store = getStore()
					const favouritesList = [...store.favorites]
					favouritesList.splice(index, 1)
					setStore({ favorites: favouritesList })
				},
			}	
			
		}
	}


export default getState;