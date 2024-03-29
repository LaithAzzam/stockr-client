'use strict';

( function(  )
{
	var listFactory = angular.module( 'listFactory', [ ] );

	listFactory.factory( 'listFactory', function( $http, $q, $state, appConstants )
	{
		var listFactoryApi = {  };

		listFactoryApi.list = [  ];

		listFactoryApi.getList = function(  )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			$http( {

				method: 'get',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/list'

			} )
			.success( function( data )
			{
				console.log( 'Get list success: ', data );

				listFactoryApi.list = data.listItems;

				deferred.resolve( data.listItems );
			} )
			.error( function( error )
			{
				console.log( 'Get list error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};

		listFactoryApi.upsertListItem = function( item )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			console.log( listFactoryApi.list );

			var cleanItem = angular.toJson( item );
			cleanItem = angular.fromJson( cleanItem );
			console.log( cleanItem );

			$http( {

				method: 'post',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/list',
				data:
				{
					listItem: cleanItem
				}

			} )
			.success( function( data )
			{
				console.log( 'addListItem success: ', data );

				deferred.resolve( data );
			} )
			.error( function( error )
			{
				console.log( 'addListItem error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};

		listFactoryApi.deleteListItem = function( item )
		{
			var deferred = $q.defer(  );
			var promise = deferred.promise;

			item = angular.toJson( item );
			item = angular.fromJson( item );

			console.log( item );

			$http( {

				method: 'put',
				withCredentials: true,
				url: appConstants.BACKEND_URL + '/api/user/list',
				data:
				{
					listItem: item
				}

			} )
			.success( function( data )
			{
				console.log( 'deleteListItem success: ', data );

				deferred.resolve( data );
			} )
			.error( function( error )
			{
				console.log( 'deleteListItem error: ', error );
				deferred.reject( error );
			} );

			return promise;
		};


		// Return public API.

		return listFactoryApi;
	} );

} )(  );
