const { app, BrowserWindow, ipcMain } = require("electron")
const fs=require("fs");
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // or the original password : 'apaswword'
    database: 'ams'
});



connection.connect(function(err) {
    // in case of error
    if (err) {
        console.log(err.code);
        console.log(err.fatal);
    }
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1500,
        height: 1000,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.loadFile("index.html")
}

app.whenReady().then(createWindow)

ipcMain.on('admin1', (event, args) => {
    var sql = "SELECT * FROM employee";
    connection.query(sql, function(err, rows1, fields) {
        if (err) throw err;
        console.log("rows"+rows1);
        event.returnValue = rows1;


    });
 
});
ipcMain.on('admin', (event, args) => {
    var sql = "SELECT * FROM admin";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("rows"+rows);
        event.returnValue = rows;


    });
 
});


ipcMain.on("addDoctor", (event, obj) => {
    
    fs.copyFile(obj.path,"./uploaddoctor/"+obj.name,(err) =>{
        
       
  
  var sql = "INSERT INTO doctor (name,phone,specialty,workingdays,toapatient,room,fee,photo,start,end) VALUES ('" + obj.fname + "','" + obj.phone+ "','" + obj.specialty+ "','" + obj.workingd+ "','" + obj.time+ "','" + obj.room+ "','" + obj.fee+ "','"+obj.name+"','" + obj.start+ "','" + obj.end+ "' )";
    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) throw err;
        console.log("1 record inserted");
    });
   
});
})

ipcMain.on('helloSyncdoc', (event, args) => {
    var sql = "select * from doctor";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});
ipcMain.on('returnItemdoc', (event, id) => {

    var sql = "DELETE FROM doctor WHERE did =" + id;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
    

})

ipcMain.on('updateItemdoc', (event, upid) => {
    var sql = "select * from doctor where did=" + upid;
    console.log(sql);
       connection.query(sql, function(err, rows, fields) {
           if (err) throw err;
             event.returnValue = rows;
        });
})

ipcMain.on("updateDoctor", (event, obj) => {
 
    var upsql = "UPDATE doctor SET photo= '"+obj.name+"', phone= '"+obj.phone+"',  name= '" + obj.fname + "' , specialty= '"+obj.specialty+"', workingdays= '"+obj.workingd+"', toapatient='"+obj.time+"', room='"+obj.room+"', fee='"+obj.fee+"', start ='"+obj.start+"', end ='"+obj.end+"' where did=" + obj.id;
   
     connection.query(upsql, function(err, result) {
         if (err) throw err;
         console.log(obj.fname);
         console.log("1 record updated");
     });
    
 })

ipcMain.on("addCustomer", (event, obj) => {
    
    fs.copyFile(obj.path,"./uploadimages/"+obj.name,(err) =>{
        
       
  
  var sql = "INSERT INTO employee (name,phone,address,email,username,password,photo) VALUES ('" + obj.fname + "','" + obj.phone+ "','" + obj.address+ "','" + obj.email+ "','" + obj.user+ "','" + obj.pass+ "','" + obj.name+ "' )";
    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) throw err;
        console.log("1 record inserted");
    });
   
});
})


ipcMain.on('helloSync', (event, args) => {
    var sql = "select * from employee";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});

ipcMain.on('returnItem', (event, id) => {

    var sql = "DELETE FROM employee WHERE eid =" + id;
    connection.query(sql, function(err, result) {
        if (err) throw err;
        console.log("Number of records deleted: " + result.affectedRows);
    });
    

})


ipcMain.on('updateItem', (event, upid) => {
     var sql = "select * from employee where eid=" + upid;
     console.log(sql);
        connection.query(sql, function(err, rows, fields) {
            if (err) throw err;
              event.returnValue = rows;
         });
})

ipcMain.on("updateCustomer", (event, obj) => {
    
   var upsql = "UPDATE employee SET photo= '"+obj.name+"', phone= '"+obj.phone+"',  name= '" + obj.fname + "' , address= '"+obj.address+"', email= '"+obj.email+"', username ='"+obj.user+"', password='"+obj.pass+"' where eid=" + obj.id;
    connection.query(upsql, function(err, result) {
        if (err) throw err;
        console.log(obj.fname);
        console.log("1 record updated");
    });
})

ipcMain.on('searchhelloSync', (event, args) => {
    console.log(args);
    var sql = "select * from doctor where name like '" +args+ "' or specialty like '" +args+ "'";
    
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;
 
 
    });
  
 });

 ipcMain.on('newpatient', (event, idd) => {
    var sql = "select * from patient " ;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});
ipcMain.on("addPatient", (event, obj) => {
    
    fs.copyFile(obj.path,"./uploadpatient/"+obj.name,(err) =>{
        
       
  
  var sql = "update patient set age='" + obj.age + "',gender='" + obj.gender+ "', address='" + obj.address+ "',details='" + obj.details+ "',photo='"+obj.name+"'  where pid =" +obj.id;
    connection.query(sql, function(err, result) {
        console.log(err);
        if (err) throw err;
        console.log("1 record inserted to patient again");
    });
   
});
})

ipcMain.on('callManagement', (event, obj) => {
    var sql = "INSERT INTO patient (name,phone) VALUES ('" + obj.fname + "','" + obj.phone+ "')";
          connection.query(sql, function(err, result) {
              console.log(err);
              if (err) throw err;
              console.log("1 record inserted to patient");
   
      })
    
   });

   ipcMain.on('helloSynccall', (event, args) => {
    var sql = "SELECT * FROM patient ";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("rows"+rows);
        event.returnValue = rows;


    });
 
});
ipcMain.on("addAppointment", (event, obj) => {
    
    var sql = "insert into appointment (pid,date,time,hospitalcharge,total,room) VALUES ('" + obj.pid+ "','" + obj.date+ "','" + obj.time+ "','" + obj.hospital+ "','" + obj.total+ "','" + obj.room+ "')";
       connection.query(sql, function(err, result) {
           console.log(err);
           if (err) throw err;
           console.log("1 record inserted to appointment");
       });
      
   });

ipcMain.on('addappointmenthelloSync', (event) => {
    var sql = "select * from appointment";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});
ipcMain.on('patientdetails', (event, args) => {
    var sql = "SELECT * FROM patient ";
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("rows"+rows);
        event.returnValue = rows;


    });
 
});

ipcMain.on('searcpatienthhelloSync', (event, args) => {
    console.log(args);
    var sql = "select * from patient where name like '" +args+ "'";
    
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;
 
 
    });
  
 });

 ipcMain.on('docappointment', (event, args) => {
    var sql = "select * from doctor " ;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});

ipcMain.on('doctorappointmenthelloSync', (event, id) => {
    var sql = "select * from doctor where did="+id ;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        console.log("select row"+rows);
        event.returnValue = rows;


    });
 
});

