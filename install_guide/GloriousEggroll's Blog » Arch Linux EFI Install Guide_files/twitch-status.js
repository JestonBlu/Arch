jQuery( document ).ready( function () {

	// Add Twitch online button containers
	for ( var channel in twitchStatus.channels )
		for ( var i in twitchStatus.channels[channel].selectors )
			jQuery( twitchStatus.channels[channel].selectors[i] ).append( '<span class="twitch-status-tag twitch-status-channel-' + channel + '"></span>' );

	twitchStatusUpdate(); // Update Twitch status buttons
	setInterval( twitchStatusUpdate, 30000 ); // Update every 30 seconds

	// Refresh widget after resize
	jQuery( window ).resize( twitchStatusRefreshWidgetSize );
	window.addEventListener( "orientationchange", twitchStatusRefreshWidgetSize, false );

	twitchStatusRefresh();
} );

function twitchStatusUpdate() {
	var data = {
		'action': 'get_twitch_channel_status'
	};

	jQuery.post( twitchStatus.ajaxurl, data, function ( response, status ) {
		if ( status !== 'success' )
			return;

		twitchStatusData = response;

		twitchStatusRefresh();
	} );
}

function twitchStatusRefresh() {
	for ( var c in twitchStatusData )
	{
		if ( twitchStatusData[c].status === 'error' )
			continue;

		var channel = twitchStatusData[c].channel;

		// Update status button
		if ( twitchStatusData[channel.name].status === 'online' )
		{
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).removeClass( 'twitch-offline' );
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).addClass( 'twitch-online' );
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).html( twitchStatus.buttonHTML.online );
		}
		else
		{
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).removeClass( 'twitch-online' );
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).addClass( 'twitch-offline' );
			jQuery( '.twitch-status-tag.twitch-status-channel-' + channel.name ).html( twitchStatus.buttonHTML.offline );
		}

		twitchStatusRefreshWidget( channel.name );
	}

	twitchStatusRefreshWidgetSize();
}

function twitchStatusRefreshWidgetSize() {
	jQuery( '.twitch-widget' ).each( function () {
		var w = jQuery( this ).width();
		var h = w / ( 16 / 9 );
		var channel = jQuery( this ).data( 'channel' );

		if ( ( typeof twitchStatusData[channel] !== 'undefined' ) && ( twitchStatusData[channel].status === 'online' ) )
			jQuery( this ).find( '.twitch-play-button' ).css( { lineHeight: h + 'px', width: w + 'px', height: h + 'px', marginTop: -h + 'px' } );
		else
		{
			jQuery( this ).find( '.twitch-offline-image' ).css( { width: w + 'px', height: h + 'px' } );
			jQuery( this ).find( '.twitch-offline-caption' ).css( { lineHeight: h + 'px', width: w + 'px', height: h + 'px', marginTop: -h + 'px' } );
		}
	} );
}

function twitchStatusRefreshWidget( channel ) {
	jQuery( '.twitch-status-channel-' + channel + '.twitch-is-loading, .twitch-status-channel-' + channel + ' .twitch-is-loading' ).hide();

	if ( twitchStatusData[channel].status === 'online' )
	{
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-channel-topic' ).html( twitchStatusData[channel].channel.status );
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-game' ).html( twitchStatusData[channel].playingHTML );

		jQuery( '.twitch-status-channel-' + channel + ' .twitch-viewers' ).html( twitchStatusData[channel].stream.viewers );
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-followers' ).html( twitchStatusData[channel].channel.followers );

		jQuery( '.twitch-status-channel-' + channel + ' .twitch-thumbnail-image' ).html( '<img src="' + twitchStatusData[channel].stream.preview.large + '">' );

		jQuery( '.twitch-status-channel-' + channel + ' .twitch-preview' ).show();
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-preview-offline' ).hide();

		jQuery( '.twitch-status-channel-' + channel + '.twitch-is-online,  .twitch-status-channel-' + channel + ' .twitch-is-online' ).show();
		jQuery( '.twitch-status-channel-' + channel + '.twitch-is-offline, .twitch-status-channel-' + channel + ' .twitch-is-offline' ).hide();
	}
	else
	{
		if ( typeof twitchStatusData[channel].channel != 'undefined' )
			jQuery( '.twitch-status-channel-' + channel + ' .twitch-offline-image' ).html( '<img src="' + twitchStatusData[channel].channel.video_banner + '">' );

		jQuery( '.twitch-status-channel-' + channel + ' .twitch-preview' ).hide();
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-offline-caption' ).text( twitchStatusData[channel].statusTxt );
		jQuery( '.twitch-status-channel-' + channel + ' .twitch-preview-offline' ).show();

		jQuery( '.twitch-status-channel-' + channel + '.twitch-is-online,  .twitch-status-channel-' + channel + ' .twitch-is-online' ).hide();
		jQuery( '.twitch-status-channel-' + channel + '.twitch-is-offline, .twitch-status-channel-' + channel + ' .twitch-is-offline' ).show();
	}
}