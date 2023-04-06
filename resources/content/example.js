function example() {

	if ( '1' == true ) {
    var name = 'John';
    var age = 18;
    if ( name === 'John' && age === 18 ) {
      console.log( 'Hello John!' );
    }
    else {
      var a = 5;
      var c = 5 + 5;
    }
    var b = 4;
    var d = 4 + 4;  
 	}		
  
  console.log( 'Test message' );
  var success = true;
  var error = false;
  
  if ( success == error ) {
    
    console.log( 'Test message 2' );
    
    if ( error == '0' ) {
			if (success == '1') {
        console.log( 'Test message 3' );
      }
			else if ( '0' == '1' ) {
      }
			else if ( 'false' == 'true' ) {
			}
		}
		else if ( 'Continue'.length === 8 ) {

      var test = 'true';

      if ( test.includes('ru') ) {
        console.log( 'Test message 4' );
      }
      else if ( test.includes('ts') ) {
        console.log('Test message 5');
      }
			else if ( test.includes('et') ) {
        console.log( 'Test message 6' );

        if ( typeof 6 === 'number' ) {
          console.log( '6 is an integer' );
        }

        else {
          console.log( typeof 6 === 'string' );
          if ( typeof null == 'undefined' ) { 
            console.log('Undefined');
          }
          else { 
            console.log('NUll');
          }
        }		
      }
		}
	}
	console.log( 'Program end' );
}