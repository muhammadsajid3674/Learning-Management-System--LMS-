import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useEffect } from "react";


const auth = getAuth(app)
const dataBase = getDatabase(app)

function handleSignup(obj, nodeName) {
    let { email, password } = obj;

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // User Registered
                let user = userCredentials.user
                // console.log(user);
                let reference = ref(dataBase, `${nodeName}/${user.uid}`);
                obj.id = user.uid
                set(reference, obj)
                    .then(() => {
                        resolve("user is registered")
                    }).catch((error) => {
                        reject(error)
                    })
            })
            .catch((error) => {
                reject(error.message)
            })
    });
};

////////////////////// Student Signup
function handleStdSignup(obj, nodeName) {
    let { email, password, courses } = obj;

    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                // User Registered
                let user = userCredentials.user
                // console.log(user);
                let reference = ref(dataBase, `${nodeName}/${user.uid}`);
                obj.id = user.uid
                obj.rollNo = `${new Date().getFullYear()}${courses}${user.uid.slice(user.uid.length - 6)}`
                set(reference, obj)
                    .then(() => {
                        resolve("user is registered")
                    }).catch((error) => {
                        reject(error)
                    })
            })
            .catch((error) => {
                reject(error.message)
            })
    });
};
////////////////////// Student Signup

function handleLogIn(obj, nodeName) {
    let { email, password } = obj;
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                let user = userCredentials.user
                let reference = ref(dataBase, `${nodeName}/${user.uid}`)
                onValue(reference, (data) => {
                    let status = data.exists()
                    // console.log(status)
                    if (status) {
                        resolve(data.val())
                        // console.log(data.val())
                    }
                    else {
                        reject("User not Found")
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                reject(errorMessage);
            })

    })
}

function handleLogOut() {
    return new Promise((resolve, reject) => {
        signOut(auth)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    });
}

function manageUser() {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                resolve(uid);
            }
            else {
                reject("user nhi hai");
            }
        })
    });
}


function pushData(obj, node, id) {
    let postListRef;
    return new Promise((resolve, reject) => {

        if (id) {
            postListRef = ref(dataBase, `${node}/${id}`)
        }
        else {
            let addRef = ref(dataBase, node)
            obj.id = push(addRef).key;
            postListRef = ref(dataBase, `${node}/${obj.id}`)
        }
        set(postListRef, obj)
            .then((res) => {
                resolve(`Data send to this node ${node}/${obj.id} successfully.`)
            })
            .catch((err) => {
                reject("Failed to end data")
            })
    });
}

function getData(node, userId) {
    let dbReference = ref(dataBase, `${node}/${userId ? userId : ""}`);
    return new Promise((resolve, reject) => {
        onValue(dbReference, (data) => {
            if (data.exists()) {
                let userData = data.val()
                if (userId) {
                    resolve(userData)
                }
                else {
                    let dataArr = Object.values(userData)
                    resolve(dataArr)
                }
            }
            else {
                reject('Data not found')
            }
        }, {
            onlyOnce: false
        });
    });
}

function deleteData(node, listId) {
    if (!listId) {
        let dbReference = ref(dataBase, `${node}`)
        return new Promise((resolve, reject) => {
            set(dbReference, null)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }
    else {
        let dbReference = ref(dataBase, `${node}/${""}`)
        return new Promise((resolve, reject) => {
            set(dbReference, null)
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                })
        });

    }
}



// export function handleGetDatabase() {
//     let reference = ref(dataBase, `user/`);
//     onValue(reference, (snapshot) => {
//         const data = snapshot.val()
//         console.log(data);
//     })
// };


// const collectionRef = collection(dataBase, 'user');
// export function sendDataFirestore(name, email, password) {
//     return addDoc(collectionRef, {
//         name: name,
//         email: email,
//     })
// }

export { handleSignup, handleLogIn, manageUser, pushData, getData, deleteData, handleLogOut, handleStdSignup }