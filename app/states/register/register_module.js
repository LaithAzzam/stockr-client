'use strict';

( function(  )
{
	var register = angular.module( 'register',
	[
		'ui.router',
		'sessionFactory'
	] );

	register.config( function( $stateProvider )
	{
		$stateProvider.state( 'register',
		{
			url: '/register',
			views:
			{
				homepage:
				{
					templateUrl: 'states/register/register_template.html',
					controller: 'RegisterController as register'
				}
			}
		} );
	} );

} )(  );