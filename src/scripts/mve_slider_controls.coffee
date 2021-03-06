mve = require('./mve_base')
MVE_Plugin = require('./mve_plugins')


MVE_SliderControls = MVE_Plugin.extend({
	defaults: {
		playerSliderSelector: ".slider-bar"


		dragNewMoveSelector: ".drag-new-move"
		zoomInSelector: ".zoom-in"
		zoomOutSelector: ".zoom-out"
	}
},{
	init: (element, options) ->
		@_super()

		viewData = @options.viewData

		# --- Slider variables --- #
		@mouseenterSlider = false
		@sliderLabels = new can.List() # label: {left: % | px, type: full | half}
		viewData.attr('sliderLabels', @sliderLabels)
		


		# --- Slider elements --- #
		@app.options.slider = @element.find(@options.playerSliderSelector)
		@app.options.sliderProgressBar = @element.find('.slider-progress')
		@app.options.loadedBar = @element.find('.slider-loaded')
		@app.options.sliderMouser = @element.find(".slider-mouser")
		@app.options.sliderBubble = @element.find(".slider-bubble")

		@options.sliderBubbleData = new can.Map({
			show: false
			left: false
			time: false
			src: undefined
			backgroundSize: "400px 300px"
			backgroundPosition: "0 0"
			highQuality: true
			# then will need background src soon
			})
		viewData.attr('sliderBubbleData', @options.sliderBubbleData)

		@options.sighDataLoaded = can.compute(false)
		@options.sighData = new can.Map({
			sigh: false
			base: false
			})

		# ------- Drag data ------ #


		@options.dragStartHandle = new can.Map(mve.handleData)
		@options.dragEndHandle = new can.Map(mve.handleData)
		@options.dragMiddle = new can.Map(mve.handleMiddleData)
		viewData.attr('dragStartHandle', @options.dragStartHandle)
		viewData.attr('dragEndHandle', @options.dragEndHandle)
		viewData.attr('dragMiddle', @options.dragMiddle)




		# ----- Drag State machine stuff ---- #		 	

		@app.fullSetupState(@DMS, @, 'dragMoveState')
		@app.fullSetupState(@ZS, @, 'zoomState')

		# ------ Buttons etc ----- #

		@options.sliderButtons = @app.options.sliderButtons


		@on()




	onPlayerReady: () ->
		@_super()
		@saveDisplayTimes(0, @duration)
		@labelSliderBar(0, @duration)
		# @loadSighData()

	onPlayerInterval: () ->
		@_super()
		if !@app.playerIsReady
			return 

		currentTime = @player.getCurrentTime()
		# update the bar
		percentage = "#{@modWidth(currentTime - @displayStartTime)}%"
		# percentage = "#{@percentForTime(currentTime)*100}%"
		# console.log(percentage)
		@app.options.sliderProgressBar.width( percentage )

		loadedPercentage = "#{@player.getVideoLoadedFraction() * 100}%"
		@app.options.loadedBar.width( loadedPercentage )

		@handleDragPlayerInterval()


	onPlayerStateChange: (newState, oldState) ->
		@_super()





	"{playerSliderSelector} mouseenter": (el, ev) ->
		@mouseenterSlider = true
		@app.options.sliderMouser.removeClass('hide')
		# @app.options.sliderBubble.removeClass('hide')
		@options.sliderBubbleData.attr('show', true)

	"{playerSliderSelector} mousemove": (el, ev) ->

		if @handleMouseMove(el, ev)
			return 

		if @mouseenterSlider
			# @sliderMouser
			# x = el.get(0).offsetLeft 
			x = el.offset().left
			mouseX = ev.clientX

			time = @timeFromX(mouseX - x)

			@app.options.sliderMouser.css('left', "#{ @modLeft(time, true, -@app.options.sliderMouser.width()/2) }px")
			# @app.options.sliderMouser.css('left', "#{mouseX - x - @app.options.sliderMouser.width()/2}px")
			# console.log(x:x, mouseX: mouseX)

			@options.sliderBubbleData.attr('time', time )
			@options.sliderBubbleData.attr('left', "#{ @modLeft(time, true, -@element.find('.slider-bubble').width()/2)}px")
			# @setSighImg(@timeFromX(mouseX - x))

	# el should always be {playerSliderSelector}
	timeFromSliderMouse: (el, ev) ->
		return @timeFromX( @xFromSliderMouse(el, ev))

	xFromSliderMouse: (el, ev) ->
		x = el.offset().left
		mouseX = ev.clientX
		return mouseX - x

	percentForTime: (timeInSeconds) ->
		# console.log(timeInSeconds: timeInSeconds, duration: @duration)
		return timeInSeconds / @player.getDuration()

	timeFromX: (x) ->
		totalWidth = @app.options.slider.width()
		percentage = x / totalWidth;
		
		duration = @displayEndTime - @displayStartTime

		time = duration * percentage + @displayStartTime;



		return time;

	"{playerSliderSelector} mouseleave": (el, ev) ->
		@mouseenterSlider = false
		@mousedown = false

		# @options.dragMoveState(@DMS.DONE)
		@handleDragMouseUp()

		@app.options.sliderMouser.addClass('hide')
		# @app.options.sliderBubble.addClass('hide')
		@options.sliderBubbleData.attr('show', false)


	# the functionality that I want ---

	###

	drag and slide across the slider bar creates a zone with two defined handles
	fades out the slider handle stuff for the current move

	once the handles are finished - it will display 2 icons - 
	zoom in, zoom out, and a create Move button, Plus
	
	clikcing plus creates a move with those start and end times


	pops out two buttons in the slider-bottom spacer
	zoom/zoom in


	###

	# Drag move state

	DMS: {
		NONE:{
			enter: (_this) ->
				_this.options.dragStartHandle.attr('show', false)
				_this.options.dragEndHandle.attr('show', false)
				_this.options.dragMiddle.attr('show', false)
				_this.options.sliderButtons.attr('showNewMove', false)
				return jQuery.when()

		}
		DOWN:{

		}
		
		MOVED:{ # moved while down

		}

		UP:{
		}
		DONE:{

		}
	}



	# ------------------- Drag + create stuff ----------------- #


	"{dragMoveState} change": (newMoveState, ev, newState, oldState) ->
		_this = @
		
		# mc = @movementControls()
		# if newState isnt @DMS.DONE
		# 	mc.options.playMoveState(mc.PMS.DONE)
		# 	mc.options.newMoveState(mc.NMS.DONE)
		@app.handleStateChange(_this, newState, oldState, 'dragMoveState')

	"{playerSliderSelector} click": (el, ev) ->
		mve.disableEvent(ev)
		# console.log('click')

		if @options.dragMoveState() is @DMS.MOVED
			return

		@movementControls().cancelMovePlay()
		# sliderWidth = @app.options.slider.width()
		# clickWidth = event.pageX - @slider.get(0).offsetLeft
		# clickWidth = event.pageX - @app.options.slider.offset().left
		# percentage = clickWidth / sliderWidth
		# timeFromPercent = @duration * percentage

		time = @timeFromSliderMouse(el,ev)

		# @sliderBar.width("#{percentage * 100}%")
		if @options.playerState() is mve.PS.UNSTARTED
			@player.playVideo()

		@player.seekTo(time)


	"{playerSliderSelector} mousedown": (el, ev) ->
		mve.disableEvent(ev)

		@options.dragMoveState(@DMS.DOWN)

		@mousedownClientX = @xFromSliderMouse(el, ev)
		time = @timeFromSliderMouse(el,ev)

		@options.dragStartHandle.attr('time', time)
		@options.dragStartHandle.attr('left', "#{@modLeft(time, true)}px")

		@options.dragEndHandle.attr('show', false)
		@options.dragEndHandle.attr('time', -1)

		
		@options.dragMiddle.attr('show', false)
		@options.dragMiddle.attr('left', "#{@modLeft(time, true)}px")

		# console.log('down')


	handleDragPlayerInterval: () ->
		# if @options.dragMoveState() is @DMS.MOVED



	handleMouseMove: (el, ev) ->
		if @options.dragMoveState() in [@DMS.DOWN, @DMS.MOVED]
			# show the two things

			@options.dragMoveState(@DMS.MOVED)

			time = @timeFromSliderMouse(el,ev)

			# @mousemove = true
			@options.dragStartHandle.attr('show', true)
			@options.dragEndHandle.attr('show', true)

			@options.dragEndHandle.attr('time', time)
			@options.dragEndHandle.attr('left', "#{@modLeft(time)}px")


			# TODO - debounce on the seekTo
			@player.pauseVideo()

			@updateHandleMiddle(@options.dragMiddle, @options.dragStartHandle.time, @options.dragEndHandle.time, @options.dragStartHandle, @options.dragEndHandle)

			# console.log("foo")



	"{playerSliderSelector} mouseup": (el, ev) ->
		mve.disableEvent(ev)
		# console.log('up')
		@handleDragMouseUp()

	handleDragMouseUp: () ->

		if @options.dragMoveState() is @DMS.MOVED
			@showDragMoveButtons(@options.dragStartHandle.time , @options.dragEndHandle.time )
		
		else if @options.dragMoveState() is @DMS.DOWN
			@options.dragStartHandle.attr('show', false)
			@options.dragMiddle.attr('show', false)
			@options.sliderButtons.attr('show', false)

		@options.dragMoveState(@DMS.DONE)

		# if @mousemove


	showDragMoveButtons: (startTime, endTime) ->
		# get the middle value
		o = @options

		# console.log(startTime: startTime, endTime: endTime)
		
		middleVal = ( startTime + endTime ) / 2
		# newLeft = @percentForTime(middleVal)
		# console.log(newLeft: newLeft)

		# TODO - center this better...
		o.sliderButtons.attr('show', true)
		o.sliderButtons.attr('showNewMove', true)
		o.sliderButtons.attr('left', "#{@modLeft(middleVal, true, - 40)}px")

	updateHandleMiddle: (handleMiddle, startTime, endTime, startHandle, endHandle) ->
		# startTime = @options.currentMovement.startTime
		# endTime = @options.currentMovement.endTime
		if !(startTime? and endTime?)
			return 

		timeDifference = Math.abs(endTime - startTime)
		smallerVal = if startTime < endTime then startTime else endTime

		handleMiddle.attr('left', "#{@modLeft(smallerVal)}px")
		handleMiddle.attr('width', "#{@modWidth(timeDifference)}%")

		handleMiddle.attr('show', startHandle.attr('show') and endHandle.attr('show'))



	"{dragNewMoveSelector} click": (el, ev) ->
		mve.disableEvent(ev)
		o = @options
		startTime = o.dragStartHandle.attr('time')
		endTime = o.dragEndHandle.attr('time')

		@movementControls().loadCreatedMovement(startTime, endTime)

		@options.dragMoveState(@DMS.NONE)

	# ------------------- Zoom stuff -------------------------- #

	# Zoom State
	ZS: {
		NONE: {}
		DONE: {}
		ZOOMING: {}
	}

	# takes in a time value and scales it according to the min and max times
	# and returns the according 'left' css value
	modLeft: (time, inPx = true, nudge = 0) ->
		pxWidth = @app.options.slider.width()
		duration = Math.abs(@displayEndTime - @displayStartTime)
		timeDiff = time - @displayStartTime
		return (pxWidth * timeDiff / duration) + nudge

	modWidth: (timeDuration, inPx = false) ->
		duration = Math.abs(@displayEndTime - @displayStartTime)
		if !inPx
			return timeDuration / duration * 100
		return timeDuration / duration


	"{zoomOutSelector} click": (el, ev) ->
		mve.disableEvent(ev)
		# console.log("zoomOutSelector click")
		@zoomOnTime(0, @duration)


	"{zoomInSelector} click": (el, ev) ->
		mve.disableEvent(ev)
		# console.log("zoomInSelector click")
		@zoomOnTime(@options.dragStartHandle.time , @options.dragEndHandle.time )

	saveDisplayTimes: (startTime, endTime) ->
		@displayStartTime = startTime
		@displayEndTime = endTime

	zoomOnTime: (startTime, endTime) ->
		@saveDisplayTimes(startTime, endTime)
		# console.log(startTime: startTime, endTime: endTime)
		@updateDragHandles()
		@labelSliderBar(startTime, endTime)

	# updates them to the current display time
	updateDragHandles: () ->
		o = @options

		starthandleTime = o.dragStartHandle.attr('time')
		endHandleTime = o.dragEndHandle.attr('time')

		o.dragStartHandle.attr('left', "#{@modLeft(starthandleTime)}px")
		o.dragEndHandle.attr('left', "#{@modLeft(endHandleTime)}px")
		@updateHandleMiddle(@options.dragMiddle, @options.dragStartHandle.time, @options.dragEndHandle.time, @options.dragStartHandle, @options.dragEndHandle)



	# label a large thing every minute
	# label a small one every half minute
	# label: {left: % | px, type: full | half}


	###

	labelOptions: {
		showMins: true
		minInterval: 1 
		
		showSeconds: true
		secondsInterval: 30

		showHours: false
		hoursInterval: 1 
		}

	# globalLabelOptions
	GLO: {
		majorLabelsVisible: 5
	}

	# lets not worry about the minor labels for now


	#  Intervals will be 10, 5, 1, 30s, 5s, 1s

	from 6 * this interval -- 6 * next interval, show this interval's count

	60  - 30 mins 	show 10m
	30  - 6 mins 	show 5m
	6   - 3 mins 	show 1m
	3   - 30s 		show 30s
	30s - 6s 		show 5s
	6s  - 3s 		show 1s
	3s  - .5s 		show .5s

	###

	labelOptionsForTime: (minTime, maxTime) ->
		result = {}

		duration = maxTime - minTime # in seconds

		HOUR = 60 * 60
		MINUTE = 60

		if duration < HOUR
			result.showMins = true

	# THIS IS REALLY HARD

	getInterval: (duration, offset = 1) ->
		HOUR = 60 * 60
		MINUTE = 60

		intervals = [ 
			{ val: 1*HOUR, label: 'h' },
			{ val: 10*MINUTE, label: 'm'},
			{ val: 5*MINUTE, label: 'm'},
			{ val: 1*MINUTE, label: 'm'},
			{ val: 30, label: 's'},
			{ val: 5, label: 's'},
			{ val: 1, label: 's'},
			{ val: .5, label: 's'}
		]

		for interval, index in intervals
			if duration > ( interval.val * 6 )
				# will break...
				if index is 0
					return intervals[index]
				else 
					return intervals[index - offset]

		return intervals[intervals.length - 1]


	labelSliderBar: (minTime, maxTime) ->
		duration = Math.abs(maxTime - minTime)
		interval = @getInterval(duration)

		console.log(minTime: minTime, maxTime: maxTime, duration: duration.toFixed(2), interval: interval.val)


		sliderBar = @element.find('.slider-bar')
		width = sliderBar.width()

		newMajorLabels = @labelsForInterval(interval, 'full', minTime, maxTime)
		newMinorLabels = @labelsForInterval(@getInterval(duration, 0), 'half', minTime, maxTime)

		newLabels = newMinorLabels.concat(newMajorLabels)

		@sliderLabels.replace( newLabels)

	labelsForInterval: (interval, type, minTime, maxTime) ->
		newLabels = []
		labelIntervals = [1..Math.floor( @duration / interval.val)]
		for num in labelIntervals
			time = num * interval.val
			if minTime <= time <= maxTime
				newLabel = {
						left: "#{ @modLeft(time) }px"
						# left: "#{ num * 60 / @duration * 100 }%"
						type: type
					}
				if interval.label in ['m', 'h']
					newLabel.timeLabel = "#{num}#{interval.label}"
				else 
					if num % (60 / interval.val) is 0 
						newLabel.timeLabel = "#{num/ (60 / interval.val)}m"
					else 
						newLabel.timeLabel = "#{Math.floor(num/ (60 / interval.val) )}m#{(time) % 60}s"
				newLabels.push(newLabel)

		return newLabels


})

module.exports = MVE_SliderControls





















