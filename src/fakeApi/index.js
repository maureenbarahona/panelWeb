/**
 * @Author: Fredi Lopez
 * @Date:   2019-02-12T16:28:27-06:00
 * @Last modified by:   Fredi Lopez
 * @Last modified time: 2019-02-12T16:28:27-06:00
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
const UserAdminData = async () =>{
     await sleep(3000);
     return (`{
        "isActive": true,
        "_id": "5c62fc4dde4718de03e1a162",
        "account": {
            "displayName": "Tester Account",
            "_id": "5c1273c91c9d4400005bdcef"
        },
        "name": "Raquel Jackson",
        "workPhone": "+50497157277",
        "email": "admin@clinpays.com",
        "mobileNumber": "+50494773575",
        "role": "ADMIN_USER",
        "token": "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50UmVmIjoiNWI4OWI5MWFlYjdhODkyZmY4OTExZWY3Iiwicm9sZSI6IkFETUlOX1VTRVIiLCJpYXQiOjE1NDUxODE1ODEsImF1ZCI6ImFwaS5wYXlnYXRlLmhuIiwiaXNzIjoicGF5Z2F0ZS5obiJ9.zPmLvu95ytMxdpCcadX5DtEmw00CX_O3QYtd6cPRpFUjBE4zc5dISQBfXjqtlUqFQCAp7nygRQ2S4HnJpEHmAkEumN_WTIGFYBADl_BD_z9GYRqb2d0-aeS1vJGr-8qgIKFkzq7FXoy2ru_L9WpFKV_0rnhVLCne4qa_8uO00OLds1_WycnVW46D5t7TuhdiER-vzVSKa7VGluMOLgg_TspWH7u_gpdb7bT6aAvmhKpWq3-NcVmYAgW7RjrUhd4lNNNKJyuurXZJXIBF438-u9LmiTFp9PUIXkRNypeK0iraYFRip935KO1VqexCiYfVhNLVCnxPBsFKgSfqRUfLE_qwhlso073vT49Am3YNEPjQCMew9yuq9eHPXfzR-4ild_b84UstYUOkomfriEg9oRdQo2BVEbKl9oPii9GGUmIoKL-aykWJPoznKuoD7yVRKVatlNTo7HxQdkMWVrQt25u6sRT8Rprm_xp4VedlyBmMt24JoI5ltj-wkWqocuEUlSOWd5T_kpjat64Gd-bQxOydscyy_8Wb_MEV9vfVqVsdUU9UXlo1JMIrIrFbHrsFHtFe4E2eMlBrT8N5nBFiurNSW9my8LVr7uPt3ykI4r6JaZk6R-uO0ndXQvORDqeGJLtc41PT0MimrjjgW01oRmGyOyBtDTqy_PPKnlr7a6k",
        "createdAt": "2018-12-24T15:00:52.922Z",
        "updatedAt": "2018-12-24T15:00:52.922Z",
        "__v": 0
    }`)
 }

export {UserAdminData}
