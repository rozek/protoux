/*******************************************************************************
*                                                                              *
*                                ProtoUX (PUX)                                 *
*                                                                              *
*******************************************************************************/

  import {
//  throwError,
    quoted,
    ValueIsOrdinal,
    ValueIsString, ValueIsNonEmptyString,
    ValueIsPlainObject,
    ValueIsArray, ValueIsListSatisfying,
    ValueIsFunction,
    ValidatorForClassifier, acceptNil, rejectNil,
    allowOrdinal,
    allowTextline,
    expectArray, allowListSatisfying,
    allowFunction, expectFunction,
    allowOneOf,
    allowURL,
  } from 'javascript-interface-library'

  import { render, html, Component } from 'htm/preact'

  import hyperactiv from 'hyperactiv'
  const  { observe, computed, dispose } = hyperactiv
  export { observe, computed, dispose }

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** install stylesheet for ProtoUX ****/

  const Stylesheet = document.createElement('style')
    Stylesheet.setAttribute('id','ProtoUX')
    Stylesheet.innerHTML = `/*******************************************************************************
*                                                                              *
*                                ProtoUX (PUX)                                 *
*                                                                              *
*******************************************************************************/

  .PUX {
    display:block; position:absolute;
    margin:0px;
    background:none;
    border:none; border-radius:0px;
    box-shadow:none;
    padding:0px;
  }

  .PUX.Screen {
    background:white; color:black;
    font-family:'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
    font-size:14px; font-weight:normal; line-height:1.4; color:black;
    text-align:left; text-shadow:none;
  }

  .textured { background-image:repeat }

  .vertically-centered {
    display:flex; align-items:center;
  }

  .disabled, [disabled] { opacity:0.3 }
  .readonly             { background:none }
  .no-pointer-events    { pointer-events:none }

  .scrollable   { overflow:scroll }
  .scrollable-x { overflow-x:scroll; overflow-y:hidden }
  .scrollable-y { overflow-x:hidden; overflow-y:scroll }

  .PUX.Box       { background-color:white }
  .PUX.Container {}
  .PUX.Group     {}

  .PUX.Title    { font-size:20px; font-weight:normal; padding:0px 0px 0px 0px; text-align:left }
  .PUX.Subtitle { font-size:16px; font-weight:normal; padding:0px 0px 0px 0px; text-align:left }
  .PUX.Label    { font-size:14px; font-weight:bold;   padding:4px 0px 0px 0px; text-align:left }
  .PUX.Textline { font-size:14px; font-weight:normal; padding:4px 0px 0px 0px; text-align:left }
  .PUX.Hint     { font-size:12px; font-weight:normal; padding:4px 0px 0px 0px; text-align:left }
  .PUX.Text     { font-size:14px; font-weight:normal; padding:2px 0px 0px 0px; text-align:justify }

  .PUX.HTMLView  {}
  .PUX.TextView  {}
  .PUX.ImageView { object-fit:contain; object-position:center center }
  .PUX.WebView   {}

  .PUX.Icon { width:24px; height:24px }

  .PUX.PseudoDropDown { width:24px; height:24px }
  .PUX.PseudoDropDown > select {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }

  .PUX.Button > button, .PUX.Checkbox > input, .PUX.Radiobutton > input,
  .PUX.Gauge > meter, .PUX.Progressbar > progress, .PUX.Slider > input,
  .PUX.TextlineInput > input, .PUX.PasswordInput > input,
  .PUX.NumberInput > input, .PUX.PhoneNumberInput > input,
  .PUX.EMailAddressInput > input, .PUX.URLInput > input,
  .PUX.TimeInput > input, .PUX.DateTimeInput > input, .PUX.DateInput > input,
  .PUX.WeekInput > input, .PUX.MonthInput > input, .PUX.SearchInput > input,
  .PUX.ColorInput > input, .PUX.DropDown > select, .PUX.FileInput > input,
  .PUX.TextInput > textarea {
    left:0px; top:0px; width:100%; height:100%;
    margin:0px; padding:0px;
    background:transparent; color:inherit;
  }

  .PUX.TextlineInput > input, .PUX.PasswordInput > input,
  .PUX.NumberInput > input, .PUX.PhoneNumberInput > input,
  .PUX.EMailAddressInput > input, .PUX.URLInput > input,
  .PUX.TimeInput > input, .PUX.DateTimeInput > input, .PUX.DateInput > input,
  .PUX.WeekInput > input, .PUX.MonthInput > input, .PUX.SearchInput > input,
  .PUX.ColorInput > input, .PUX.DropDown > select, .PUX.FileInput > input,
  .PUX.TextInput > textarea {
    border:solid 1px #888888; border-radius:2px;
    background:#e8f0ff; padding:0px 2px 0px 2px;
  }

  .PUX.TextlineInput > input:read-only, .PUX.PasswordInput > input:read-only,
  .PUX.NumberInput > input:read-only, .PUX.PhoneNumberInput > input:read-only,
  .PUX.EMailAddressInput > input:read-only, .PUX.URLInput > input:read-only,
  .PUX.TimeInput > input:read-only, .PUX.DateTimeInput > input:read-only,
  .PUX.DateInput > input:read-only, .PUX.WeekInput > input:read-only,
  .PUX.MonthInput > input:read-only, .PUX.SearchInput > input:read-only,
  .PUX.ColorInput > input:read-only, .PUX.DropDown > select:read-only,
  .PUX.FileInput > input:read-only, .PUX.TextInput > textarea:read-only {
    background:transparent;
  }

  .PUX.Button > button {
    background:white;
    border:solid 1px black; border-radius:4px;
    background:transparent; color:inherit;
  }

  .PUX.FileInput {
    color:lightgray;
    border:solid 1px black; border-radius:3px;
  }
  .PUX.FileInput > span {
    display:flex; align-items:center; position:absolute; overflow:hidden;
    left:0px; top:0px; width:100%; height:100%;
    padding:0px 2px 0px 2px; text-overflow:ellipsis;
  }

  .PUX.TextInput > textarea { border:none; background:#e8f0ff; padding:2px }
  .PUX.TextInput.no-resize > textarea { resize:none }

  .PUX.horizontalSeparator {
    height:1px; margin:0px; margin-top:7px;
    border:none; border-top:solid 1px black
  }
  .PUX.verticalSeparator {
    width:1px; margin:0px; margin-left:7px;
    border:none; border-left:solid 1px black
  }

  .PUX.FileDropArea {/*
    display:flex; flex-flow:column nowrap;
      justify-content:center; align-items:center;*/
    border:dashed 4px #DDDDDD; border-radius:4px;
    color:#DDDDDD;
  }

  .PUX.FileDropArea * { pointer-events:none }

  .PUX.FileDropArea > input[type="file"] {
    display:block; position:absolute; appearance:none;
    left:0px; top:0px; right:0px; bottom:0px;
    opacity:0.01;
  }

  .PUX.Accordion {
    display:flex; flex-flow:column nowrap; align-items:stretch;
    overflow:auto;
  }

  .PUX.Fold {
    display:block; position:relative;
    left:0px; top:0px; width:100%; bottom:auto;
  }

  .PUX.Fold-Header {
    display:block; position:relative;
    width:100%; height:30px; background:#EEEEEE; border:none;
    border-top:   solid 1px #FFFFFF;
    border-bottom:solid 1px #AAAAAA;
  }

  .PUX.Fold-Expander {
    left:2px; top:2px; width:24px; height:24px;
  }

  .PUX.Fold-Title {
    left:30px; top:0px; bottom:0px; right:0px;
    font-size:14px; font-weight:bold; color:black; line-height:30px;
  }

  .PUX.Fold-Content {
    display:block; position:relative;
    left:0px; top:0px; width:100%; height:auto;
  }
  .PUX.Deck {}

  .PUX.Card {
    left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto;
    border:none;
  }
  .PUX.TabStrip {
    display:flex; flex-flow:row nowrap; align-items:stretch;
  }

  .PUX.Tab {
    display:block; position:relative;
    left:0px; top:0px; height:100%; width:auto;
    border:none; border-width:0px 0px 4px 0px;
  }
  .PUX.Tab.active { border-style:solid; border-color:black }

  .PUX.Tab > * { pointer-events:none }

  .PUX.FlatListView {
    display:flex; flex-flow:column nowrap; align-items:stretch;
    overflow:scroll; overflow-x:auto; overflow-y:scroll;
  }

  .PUX.FlatListView > div {
    display:block; position:relative; overflow:hidden; flex:0 0 auto;
    left:0px; top:0px; width:auto; height:22px; line-height:22px;
    background:none;
    border:none; border-bottom:solid 1px light-gray;
    white-space:nowrap; text-overflow:ellipsis;
    user-select:none;
  }

  .PUX.FlatListView > div:last-child {
    border:none; border-bottom:solid 1px transparent;
  }

  .PUX.FlatListView > div.selected {
    background:dodgerblue; color:white;
  }


  .PUX.NestedListView {
    display:flex; flex-flow:column nowrap; align-items:stretch;
    overflow:scroll; overflow-x:auto; overflow-y:scroll;
  }

  .PUX.NestedListView .ItemView {
    display:flex; flex-flow:column nowrap; align-items:stretch;
      position:relative; overflow:hidden; flex:0 0 auto;
    left:0px; top:0px; width:auto; height:auto;
    background:none; border:none;
    user-select:none;
  }

  .PUX.NestedListView .ItemLine {
    display:flex; flex-flow:row nowrap; align-items:stretch;
      position:relative; flex:0 0 auto;
    height:22px; line-height:22px;
    white-space:nowrap; text-overflow:ellipsis;
  }

  .PUX.NestedListView .ItemIcon {
    display:inline-block; position:relative;
    margin-top:6px; width:14px; height:10px;
    pointer-events:none;
  }

  .PUX.NestedListView .ItemExpander {
    display:inline-block; position:relative;
    margin-top:4px; width:14px; height:14px;
    pointer-events:auto;
  }

  .PUX.NestedListView .ItemLabel {
    display:inline-block; position:relative; flex:1 0 auto;
    pointer-events:none;
  }

  .PUX.NestedListView .ItemLine.selected > .ItemLabel {
    background:dodgerblue; color:white;
  }

  .PUX.ModalLayer {
    display:block; position:absolute;
    background:rgba(0,0,0,0.3); border:none;
  }


  .PUX.Dialog, .PUX.ResizableDialog {
    display:block; position:absolute;
    border:solid 1px #000000; border-radius:4px;
    background:white; color:black;
    box-shadow:0px 0px 10px 0px rgba(0,0,0,0.3);
  }

  .PUX.Dialog > .Titlebar, .PUX.ResizableDialog > .Titlebar {
    display:block; position:absolute; overflow:hidden;
    left:0px; top:0px; right:0px; height:30px;
    background:#EEEEEE; border:none; border-radius:3px 3px 0px 0px;
    user-select:none;
  }

  .PUX.Dialog > .Titlebar > .Title, .PUX.ResizableDialog > .Titlebar > .Title {
    display:block; position:absolute;
    left:6px; top:3px; right:30px; height:18px;
    border:none;
    font-weight:bold; color:black;
    user-select:none; pointer-events:none;
  }

  .PUX.Dialog > .Titlebar > .CloseButton, .PUX.ResizableDialog > .Titlebar > .CloseButton {
    display:block; position:absolute;
    top:0px; right:0px; width:30px; height:30px;
    border:none;
    user-select:none;
  }

  .PUX.ResizableDialog > .ContentPane {
    display:block; position:absolute;
    left:0px; top:0px; right:0px; bottom:9px;
    border:none;
  }

  .PUX.ResizableDialog > .leftResizer {
    display:block; position:absolute;
    left:0px; bottom:0px; width:30px; height:9px;
    border:none; border-top:solid 1px black; border-right:solid 1px black;
    border-radius:0px 0px 0px 3px;
    cursor:nesw-resize;
  }

  .PUX.ResizableDialog > .middleResizer {
    display:block; position:absolute;
    left:30px; bottom:0px; right:30px; height:9px;
    border:none; border-top:solid 1px black;
    border-radius:0px;
    cursor:ns-resize;
  }

  .PUX.ResizableDialog > .rightResizer {
    display:block; position:absolute;
    bottom:0px; right:0px; width:30px; height:9px;
    border:none; border-left:solid 1px black; border-top:solid 1px black;
    border-radius:0px 0px 3px 0px;
    cursor:nwse-resize;
  }



/**** centered ****/

  .centered {
    display:block; position:relative;
    width:100%; height:100%; max-height:240px;
  }

  .centered > * {
    display:block; position:absolute;
    left:50%; top:50%;
    transform:translate(-55%,-50%);
    white-space:nowrap;
  }

`
  document.head.appendChild(Stylesheet)

/**** throwError - simplifies construction of named errors ****/

  export function throwError (Message:string):never {
    let Match = /^([$a-zA-Z][$a-zA-Z0-9]*):\s*(\S.+)\s*$/.exec(Message)
    if (Match == null) {
      throw new Error(Message)
    } else {
      let namedError = new Error(Match[2])
        namedError.name = Match[1]
debugger
      throw namedError
    }
  }

/**** throwReadOnlyError ****/

// @ts-ignore TS2534 why is TS complaining here?
  export function throwReadOnlyError (Name:string):never {
    throwError(
      'ReadOnlyProperty: property ' + quoted(Name) + ' must not be set'
    )
  }

/**** DragRecognizerFor ****/

  const DragRecognizerForWidget:WeakMap<Indexable,Function> = new WeakMap()

  export function DragRecognizerFor (
    Widget:Indexable, OptionSet:Indexable
  ):Function {
    let DragRecognizer = DragRecognizerForWidget.get(Widget)
    if (DragRecognizer != null) { return DragRecognizer }

    function DummyCallback () {}

    function consumeEvent (Event:Event):void {
      Event.stopImmediatePropagation()
      Event.preventDefault()
    }

/*C*/ let PointerTarget:HTMLElement|undefined
/*C*/        // workaround for undesired disappearance of pointer capture target

    let {
      onlyFrom, neverFrom, Threshold = 0, consumingEvent = true,
      onDragStarted  = DummyCallback, onDragContinued = DummyCallback,
      onDragFinished = DummyCallback, onDragCancelled = DummyCallback
    } = OptionSet

    let State = 'idle'                       // one of 'idle','observing','busy'
    let x0:number,y0:number

  /**** PointerEvent Handlers ****/

    function onPointerDown (Event:PointerEvent):void {
      if (onlyFrom != null) {
        if (
          (onlyFrom instanceof HTMLElement) && (onlyFrom !== Event.target) ||
          (typeof onlyFrom === 'string') && ! (Event.target as HTMLElement).matches(onlyFrom)
        ) { return }
      }

      if (neverFrom != null) {
        if (
          (neverFrom instanceof HTMLElement) && (neverFrom === Event.target) ||
          (typeof neverFrom === 'string') && (Event.target as HTMLElement).matches(neverFrom)
        ) { return }
      }

      if (Event.button === 0) {
        (Event.target as HTMLElement).setPointerCapture(Event.pointerId)
/*C*/ PointerTarget = Event.target as HTMLElement
        if (State === 'idle') {
          ;({ pageX:x0, pageY:y0 } = Event)
          if (Threshold > 0) {
            State = 'observing'    // wait for actual movement to start dragging
          } else {
            startDragging(Event)
          }
        }
      } else {
        abortDragging(Event)
      }
    }

    function onPointerMove (Event:PointerEvent):void {
/*C*/ if ((State !== 'idle') && (Event.target !== PointerTarget)) {
/*C*/   ;(Event.target as HTMLElement).setPointerCapture(Event.pointerId)
/*C*/   PointerTarget = Event.target as HTMLElement
/*C*/ console.log('PointerTarget changed')
/*C*/ }
      if (State === 'observing') {                     // before actual dragging
        let { pageX:x,pageY:y } = Event
        if ((x0-x)**2 + (y0-y)**2 >= Threshold**2) { startDragging(Event) }
      } else {
        if (State === 'busy') { continueDragging(Event) }
      }
    }

    function onPointerUp (Event:PointerEvent):void {
      if (State === 'busy') {
        finishDragging(Event)
      } else {
        abortDragging(Event)
      }
    }

    function onPointerCancel (Event:PointerEvent):void {
      abortDragging(Event)
    }

  /**** State Transitions ****/

    function startDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      State = 'busy'
      let { pageX:x,pageY:y } = Event
      onDragStarted(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
    }

    function continueDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      let { pageX:x,pageY:y } = Event
      onDragContinued(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
    }

    function finishDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      State = 'idle'
      let { pageX:x,pageY:y } = Event
      onDragFinished(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
/*C*/ PointerTarget = undefined
    }

    function abortDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      if (State !== 'idle') {
        const wasBusy = (State === 'busy')
          State = 'idle'
          ;(Event.target as HTMLElement).releasePointerCapture(Event.pointerId) // if called from ext.
        if (wasBusy) { onDragCancelled(Math.round(x0),Math.round(y0), 0,0, Event) }
      }
/*C*/ PointerTarget = undefined
    }

  /**** return generic callback ****/

    DragRecognizer = function (Event:PointerEvent):void {
      switch (Event.type) {
        case 'pointerdown':  return onPointerDown(Event)
        case 'pointermove':  return onPointerMove(Event)
        case 'pointerup':    return onPointerUp(Event)
        case 'pointercancel':return onPointerCancel(Event)
      }
    }
// @ts-ignore TS2339 allow assignment
      DragRecognizer.abortDragging = abortDragging        // externally callable
    DragRecognizerForWidget.set(Widget,DragRecognizer)

    return DragRecognizer
  }

/**** DragClickRecognizerFor ****/

  const DragClickRecognizerForWidget:WeakMap<Indexable,Function> = new WeakMap()

  export function DragClickRecognizerFor (
    Widget:Indexable, OptionSet:Indexable
  ):Function {
    let DragClickRecognizer = DragClickRecognizerForWidget.get(Widget)
    if (DragClickRecognizer != null) { return DragClickRecognizer }

    function DummyCallback () {}

    function consumeEvent (Event:Event):void {
      Event.stopImmediatePropagation()
      Event.preventDefault()
    }

/*C*/ let PointerTarget:HTMLElement|undefined
/*C*/        // workaround for undesired disappearance of pointer capture target

    let {
      onlyFrom, neverFrom, Threshold = 0, consumingEvent = true,
      onDragStarted  = DummyCallback, onDragContinued = DummyCallback,
      onDragFinished = DummyCallback, onDragCancelled = DummyCallback,
      onClicked = DummyCallback,
      MultiClickTimeSpan = 300, onMultiClick = DummyCallback
    } = OptionSet

    let State = 'idle'                       // one of 'idle','observing','busy'
    let x0:number,y0:number
    let lastClickTime = 0, lastClickType = 0

  /**** PointerEvent Handlers ****/

    function onPointerDown (Event:PointerEvent):void {
      if (onlyFrom != null) {
        if (
          (onlyFrom instanceof HTMLElement) && (onlyFrom !== Event.target) ||
          (typeof onlyFrom === 'string') && ! (Event.target as HTMLElement).matches(onlyFrom)
        ) { return }
      }

      if (neverFrom != null) {
        if (
          (neverFrom instanceof HTMLElement) && (neverFrom === Event.target) ||
          (typeof neverFrom === 'string') && (Event.target as HTMLElement).matches(neverFrom)
        ) { return }
      }

      if (Event.button === 0) {
        (Event.target as HTMLElement).setPointerCapture(Event.pointerId)
/*C*/ PointerTarget = Event.target as HTMLElement
        if (State === 'idle') {
          ;({ pageX:x0, pageY:y0 } = Event)
          if (Threshold > 0) {
            State = 'observing'    // wait for actual movement to start dragging
          } else {
            startDragging(Event)
          }
        }
      } else {
        abortDragging(Event)
      }
    }

    function onPointerMove (Event:PointerEvent):void {
/*C*/ if ((State !== 'idle') && (Event.target !== PointerTarget)) {
/*C*/   ;(Event.target as HTMLElement).setPointerCapture(Event.pointerId)
/*C*/   PointerTarget = Event.target as HTMLElement
/*C*/ console.log('PointerTarget changed')
/*C*/ }
      if (State === 'busy')      { continueDragging(Event) }
      if (State === 'observing') {                     // before actual dragging
        let { pageX:x,pageY:y } = Event
        if ((x0-x)**2 + (y0-y)**2 >= Threshold**2) { startDragging(Event) }
      }
    }

    function onPointerUp (Event:PointerEvent):void {
      if (State === 'busy')      { finishDragging(Event) }
      if (State === 'observing') {
        State = 'idle'
        onClicked(x0,y0, Event)

        let now = Date.now()
        if (now-lastClickTime < MultiClickTimeSpan) {
          lastClickType += 1
          if (lastClickType > 1) { onMultiClick(lastClickType, x0,y0, Event) }
        } else {
          lastClickType = 1
        }
        lastClickTime = now
      }
    }

    function onPointerCancel (Event:PointerEvent):void {
      abortDragging(Event)
    }

  /**** State Transitions ****/

    function startDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      State = 'busy'
      let { pageX:x,pageY:y } = Event
      onDragStarted(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
    }

    function continueDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      let { pageX:x,pageY:y } = Event
      onDragContinued(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
    }

    function finishDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      State = 'idle'
      let { pageX:x,pageY:y } = Event
      onDragFinished(
        Math.round(x),Math.round(y), Math.round(x-x0),Math.round(y-y0), Event
      )
/*C*/ PointerTarget = undefined
    }

    function abortDragging (Event:PointerEvent):void {
      if (consumingEvent) { consumeEvent(Event) }

      if (State !== 'idle') {
        const wasBusy = (State === 'busy')
          State = 'idle'
          ;(Event.target as HTMLElement).releasePointerCapture(Event.pointerId) // if called from ext.
        if (wasBusy) { onDragCancelled(Math.round(x0),Math.round(y0), 0,0, Event) }
      }
/*C*/ PointerTarget = undefined
    }

  /**** return generic callback ****/

    DragClickRecognizer = function (Event:PointerEvent):void {
      switch (Event.type) {
        case 'pointerdown':  return onPointerDown(Event)
        case 'pointermove':  return onPointerMove(Event)
        case 'pointerup':    return onPointerUp(Event)
        case 'pointercancel':return onPointerCancel(Event)
      }
    }
// @ts-ignore TS2339 allow assignment
      DragClickRecognizer.abortDragging = abortDragging   // externally callable
    DragClickRecognizerForWidget.set(Widget,DragClickRecognizer)

    return DragClickRecognizer
  }

//------------------------------------------------------------------------------
//--                                 ProtoUX                                  --
//------------------------------------------------------------------------------

  export class ProtoUX {
    private _IdPrefix:string

    private _ImageFolder:string = ''

    private _ScreenSet:Indexable    = {}         // just to satisfy the compiler
    private _DialogSet:Indexable    = {}                                 // dto.
    private _observed:Indexable     = observe({}, { deep:false })
    private _UpdaterList:Function[] = []

    private _StartScreen:Indexable   = {}        // just to satisfy the compiler
    private _openScreen:Indexable    = {}                                // dto.
    private _openDialogs:Indexable[] = []

    private _View:PUX_View|undefined

    private static _WidgetViewRegistry:Indexable = Object.create(null)

  /**** constructor ****/

    public constructor (IdPrefix:string = 'PUX') {
      this._IdPrefix = IdPrefix
    }

  /**** ImageFolder - where to find image files ****/

    public get ImageFolder ():string          { return this._ImageFolder }
    public set ImageFolder (newFolder:string) {
      newFolder = newFolder.trim()
      if ((newFolder !== '') && ! newFolder.endsWith('/')) {
        newFolder += '/'
      }
      this._ImageFolder = newFolder
    }

  /**** Style - represents the CSS stylesheet of a given ProtoUX project ****/

    public get Style ():string {
      const StyleId = this._IdPrefix + '-Style'
      const Element = document.getElementById(StyleId)
      return (Element == null ? '' : Element.innerHTML)
    }

    public set Style (newStyle:string) {
      const StyleId = this._IdPrefix + '-Style'

      let ImageFolder = this._ImageFolder
      if (ImageFolder !== '') {
        newStyle = newStyle.replace(/url\("\/images\//g,'url("'+ImageFolder)
      }

      let Element = document.getElementById(StyleId)
      if (Element == null) {
        Element = document.createElement('style')
          Element.setAttribute('id',StyleId)
        document.head.appendChild(Element)
      }
      Element.innerHTML = newStyle
    }

  /**** ScreenSet - represents the set of screens in a ProtoUX project ****/

    public get ScreenSet ():Indexable       { return this._ScreenSet }
    public set ScreenSet (newSet:Indexable) {
      this._ScreenSet = newSet

      for (let ScreenName in newSet) {    // sets a default "StartScreen", hacky
        this._StartScreen = newSet[ScreenName]
        break
      }

      for (let ScreenName in newSet) {      // prepare for "packing", if desired
        Object.assign(newSet[ScreenName], { dX:0,dY:0, dW:0,dH:0 })
      }
    }

  /**** observed - makes ProtoUX projects "reactive" ****/

    public get observed ():Indexable  { return this._observed }
    public set observed (_:Indexable) { throwReadOnlyError('observed') }

  /**** ScreenNamed ****/

    public ScreenNamed (ScreenName:string):Indexable|undefined {
      return this._ScreenSet[ScreenName]
    }

  /**** existingScreenNamed ****/

    public existingScreenNamed (ScreenName:string):Indexable {
      const Screen = this._ScreenSet[ScreenName]
      if (Screen == null) throwError(
        'NoSuchScreen: a screen named ' + quoted(ScreenName) + ' does not exist'
      )

      return Screen
    }

  /**** packScreen ****/

    public packScreen (
      ScreenName:string, padX:number = 10, padY?:number
    ):void {
      if (padY == null) { padY = padX }

      const Screen = this.existingScreenNamed(ScreenName)
      if (Screen.packedGeometry == null) { return }

      let { x,y, Width,Height } = Screen.packedGeometry
        x -= padX; Width  += 2*padX
        y -= padY; Height += 2*padY
      Screen.Width  = Width
      Screen.Height = Height

      Screen.WidgetList.forEach((Widget:Indexable) => {
        if (Widget.hidden) { return }

        Widget.x -= x
        Widget.y -= y
      })
    }

  /**** openScreen ****/

    public openScreen (ScreenName:string):void {
      const Screen = this.existingScreenNamed(ScreenName)
      if (this._openScreen === Screen) { return }

      this._openScreen = Screen
      this.rerender()
    }

  /**** closeScreen ****/

    public closeScreen (ScreenName:string):void {
      const Screen = this.ScreenNamed(ScreenName)
      if (Screen == null) { return }

      if (this._openScreen !== Screen) { return }

      this._openScreen = this._StartScreen
      this.rerender()
    }

  /**** ScreenIsOpen ****/

    public ScreenIsOpen (ScreenName:string):boolean {
      const Screen = this.existingScreenNamed(ScreenName)
      return (this._openScreen === Screen)
    }

  /**** startWithScreen ****/

    public startWithScreen (ScreenName:string):void {
      this._StartScreen = this.existingScreenNamed(ScreenName)
      this.openScreen(ScreenName)
    }

  /**** StartScreen ****/

    public get StartScreen ():Indexable  { return this._StartScreen }
    public set StartScreen (_:Indexable) { throwReadOnlyError('StartScreen') }

  /**** extractAllDialogs ****/

    public extractAllDialogs ():void {
      for (let ScreenName in this._ScreenSet) {
        const WidgetList = this._ScreenSet[ScreenName].WidgetList
        for (let i = WidgetList.length-1; i >= 0; i--) {
          const Widget = WidgetList[i]
          if ((Widget.Type === 'Dialog') || (Widget.Type === 'ResizableDialog')) {
            if (! ValueIsNonEmptyString(Widget.Name)) {
              console.error('Dialog without name in screen "' + ScreenName + '"')
              continue
            }

            if (Widget.Name in this._DialogSet) {
              console.error('a dialog with name "' + Widget.Name + '" has already been registered')
              continue
            }

            this._DialogSet[Widget.Name] = Widget
            WidgetList.splice(i,1)
          }
        }
      }
    }

  /**** DialogNamed ****/

    public DialogNamed (DialogName:string):Indexable|undefined {
      return this._DialogSet[DialogName]
    }

  /**** existingDialogNamed ****/

    public existingDialogNamed (DialogName:string):Indexable {
      const Dialog = this._DialogSet[DialogName]
      if (Dialog == null) throwError(
        'NoSuchDialog: a dialog named ' + quoted(DialogName) + ' does not exist'
      )

      return Dialog
    }

  /**** openDialog ****/

    public openDialog (DialogName:string):void {
      const Dialog = this.existingDialogNamed(DialogName)

      const DialogIndex = this._openDialogs.indexOf(Dialog)
      if (DialogIndex >= 0) {
        if (DialogIndex === this._openDialogs.length-1) { return }
        this._openDialogs.splice(DialogIndex,1)
      }

      this._openDialogs.push(Dialog)
        if (typeof Dialog.onOpen === 'function') { Dialog.onOpen(Dialog) }
      this.rerender()
    }

  /**** closeDialog ****/

    public closeDialog (DialogName:string):void {
      let Dialog = this.DialogNamed(DialogName)
      if (Dialog == null) { return }

      const DialogIndex = this._openDialogs.indexOf(Dialog)
      if (DialogIndex < 0) { return }

      this._openDialogs.splice(DialogIndex,1)
        if (typeof Dialog.onClose === 'function') { Dialog.onClose(Dialog) }
      this.rerender()
    }

  /**** DialogIsOpen ****/

    public DialogIsOpen (DialogName:string):boolean {
      let Dialog = this.existingDialogNamed(DialogName)
      return (this._openDialogs.indexOf(Dialog) >= 0)
    }

  /**** openDialogs ****/

    public get openDialogs ():Indexable[]  { return this._openDialogs.slice() }
    public set openDialogs (_:Indexable[]) { throwReadOnlyError('openDialogs') }

  /**** closeAllDialogs ****/

    public closeAllDialogs ():void {
      this._openDialogs.length = 0
      this.rerender()
    }

  /**** DialogIsFrontMost ****/

    public DialogIsFrontMost (DialogName:string):boolean {
      let Dialog = this.existingDialogNamed(DialogName)
      return (this._openDialogs.indexOf(Dialog) === this._openDialogs.length-1)
    }

  /**** bringDialogToFront ****/

    public bringDialogToFront (DialogName:string):void {
      this.openDialog(DialogName)
    }

  /**** WidgetNamed ****/

    public WidgetNamed (WidgetName:string):Indexable|undefined {
      const ScreenSet = this._ScreenSet
      for (let ScreenName in ScreenSet) {
        const WidgetList = ScreenSet[ScreenName].WidgetList
        for (let i = 0, l = WidgetList.length; i < l; i++) {
          if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
        }
      }
      return undefined
    }

  /**** existingWidgetNamed ****/

    public existingWidgetNamed (WidgetName:string):Indexable {
      const Widget = this.WidgetNamed(WidgetName)
      if (Widget == null) throwError(
        'NoSuchWidget: a widget named ' + quoted(WidgetName) + ' does not exist'
      )

      return Widget
    }

  /**** WidgetOnScreen/Dialog ****/

    public WidgetOnScreen (WidgetName:string, Screen:Indexable):Indexable|undefined {
      const WidgetList = Screen.WidgetList || []
      for (let i = 0, l = WidgetList.length; i < l; i++) {
        if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
      }
      return undefined
    }

    public WidgetOnDialog (WidgetName:string, Dialog:Indexable):Indexable|undefined {
      return this.WidgetOnScreen(WidgetName,Dialog)            // keeps code DRY
    }

  /**** existingWidgetOnScreen/Dialog ****/

    public existingWidgetOnScreen (WidgetName:string, Screen:Indexable):Indexable {
      const Widget = this.WidgetOnScreen(WidgetName,Screen)
      if (Widget == null) throwError(
        'NoSuchWidget: screen ' + quoted(Screen.Name) + ' does not contain ' +
        'a widget named ' + quoted(WidgetName)
      )

      return Widget
    }

    public existingWidgetOnDialog (WidgetName:string, Dialog:Indexable):Indexable {
      const Widget = this.WidgetOnDialog(WidgetName,Dialog)
      if (Widget == null) throwError(
        'NoSuchWidget: dialog ' + quoted(Dialog.Name) + ' does not contain ' +
        'a widget named ' + quoted(WidgetName)
      )

      return Widget
    }

  /**** WidgetInContainer ****/

    public WidgetInContainer (WidgetName:string, Container:Indexable):Indexable|undefined {
      const WidgetList = Container.WidgetList || []
      for (let i = 0, l = WidgetList.length; i < l; i++) {
        if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
      }
      return undefined
    }

  /**** existingWidgetInContainer ****/

    public existingWidgetInContainer (WidgetName:string, Container:Indexable):Indexable {
      const Widget = this.WidgetInContainer(WidgetName,Container)
      if (Widget == null) throwError(
        'NoSuchWidget: could not find widget named ' + quoted(WidgetName)
      )

      return Widget
    }

  /**** stuffing ****/

    public stuff (PropSet:Indexable):void {
      for (let Name in PropSet) {
        const Screen = this.ScreenNamed(Name)
        if (Screen != null) {
          this.stuffScreen(Screen,PropSet[Name])
          continue
        }

        const Dialog = this.DialogNamed(Name)
        if (Dialog != null) {
          this.stuffDialog(Dialog,PropSet[Name])
          continue
        }

        throwError(
          'NoSuchScreenOrDialog: no screen or dialog named ' + quoted(Name) + ' found'
        )
      }
    }

  /**** stuffScreen ****/

    public stuffScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let WidgetName in PropSet) {
        let Widget = this.existingWidgetOnScreen(WidgetName,Screen)
        this.stuffWidget(Widget,PropSet[WidgetName])
      }
    }

  /**** stuffDialog ****/

    public stuffDialog (Dialog:Indexable, PropSet:Indexable):void {
      for (let WidgetName in PropSet) {
        let Widget = this.existingWidgetOnDialog(WidgetName,Dialog)
        this.stuffWidget(Widget,PropSet[WidgetName])
      }
    }

  /**** stuffWidget ****/

    public stuffWidget (Widget:Indexable, PropSet:Indexable):void {
      if (this.ValueIsStuff(PropSet)) {
        const fromScreen = this.existingScreenNamed(PropSet.from)
        Widget.WidgetList = (Widget.WidgetList || []).concat(PropSet.with.map(
          (WidgetName:string) => this.existingWidgetOnScreen(WidgetName,fromScreen)
        ))
      } else {
        for (let Property in PropSet) {
          const innerWidget = this.existingWidgetInContainer(Property,Widget)
          this.stuffWidget(innerWidget,PropSet[Property])
        }
      }
    }

  /**** ValueIsStuff ****/

    public ValueIsStuff (Candidate:any):boolean {
      return (
        ValueIsPlainObject(Candidate) &&
        ValueIsString(Candidate.from) &&
        ValueIsListSatisfying(Candidate.with,ValueIsString)
      )
    }

  /**** configure (w/o rerendering) ****/

    public configure (PropSet:Indexable):void {
      for (let Name in PropSet) {
        const Screen = this.ScreenNamed(Name)
        if (Screen != null) {
          this.configureScreen(Screen,PropSet[Name])
          continue
        }

        const Dialog = this.DialogNamed(Name)
        if (Dialog != null) {
          this.configureDialog(Dialog,PropSet[Name])
          continue
        }

        throwError(
          'NoSuchScreenOrDialog: no screen or dialog named ' + quoted(Name) + ' found'
        )
      }
    }

  /**** configureScreen (w/o rerendering) ****/

    public configureScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let Name in PropSet) {
        if (Name === 'self') {
          this.configureWidget(Screen,PropSet.self)
        } else {
          const Widget = this.existingWidgetOnScreen(Name,Screen)
          this.configureWidget(Widget,PropSet[Name])
        }
      }
    }

  /**** configureDialog (w/o rerendering) ****/

    public configureDialog (Dialog:Indexable, PropSet:Indexable):void {
      for (let Name in PropSet) {
        if (Name === 'self') {
          this.configureWidget(Dialog,PropSet.self)
        } else {
          const Widget = this.existingWidgetOnDialog(Name,Dialog)
          this.configureWidget(Widget,PropSet[Name])
        }
      }
    }

  /**** configureWidget (w/o rerendering) ****/

    public configureWidget (Widget:Indexable, PropSet:Indexable):void {
      for (let Property in PropSet) {
        let Value = PropSet[Property]
        if (ValueIsPlainObject(Value) && ValueIsFunction(Value.Updater)) {
          this._UpdaterList.push(computed(() => {
            this.updateWidget(Widget, { [Property]:Value.Updater() })
          }))
        } else {
          if (ValueIsPlainObject(Value) && (Widget.WidgetList != null)) {
            const innerWidget = this.WidgetInContainer(Property,Widget)
            if (innerWidget != null) {
              this.configureWidget(innerWidget,Value)
              continue
            }
          }

          Widget[Property] = Value
        }
      }
    }

  /**** update (w/ rerendering) ****/

    public update (PropSet:Indexable):void {
      for (let Name in PropSet) {
        const Screen = this.ScreenNamed(Name)
        if (Screen != null) {
          this.updateScreen(Screen,PropSet[Name])
          continue
        }

        const Dialog = this.DialogNamed(Name)
        if (Dialog != null) {
          this.updateDialog(Dialog,PropSet[Name])
          continue
        }

        throwError(
          'NoSuchScreenOrDialog: no screen or dialog named ' + quoted(Name) + ' found'
        )
      }
    }

  /**** updateScreen (w/o rerendering) ****/

    public updateScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let Name in PropSet) {
        if (Name === 'self') {
          this.updateWidget(Screen,PropSet.self)
        } else {
          const Widget = this.existingWidgetOnScreen(Name,Screen)
          this.updateWidget(Widget,PropSet[Name])
        }
      }
    }

  /**** updateDialog (w/o rerendering) ****/

    public updateDialog (Dialog:Indexable, PropSet:Indexable):void {
      for (let Name in PropSet) {
        if (Name === 'self') {
          this.updateWidget(Dialog,PropSet.self)
        } else {
          const Widget = this.existingWidgetOnDialog(Name,Dialog)
          this.updateWidget(Widget,PropSet[Name])
        }
      }
    }

  /**** updateWidget (w/ rerendering) ****/

    public updateWidget (Widget:Indexable,PropSet:Indexable):void {
      for (let Property in PropSet) {
        Widget[Property] = PropSet[Property]
      }

      const View = Widget.View
      if (View != null) { View.rerender() }
    }

  /**** updatedFrom ****/

    public updatedFrom (Updater:Function):Indexable {
      return { Updater }
    }

  /**** View ****/

    public get View ():PUX_View|undefined  { return this._View }
    public set View (_:PUX_View|undefined) { throwReadOnlyError('View') }

  /**** renderInto ****/

    public renderInto (Container:HTMLElement):void {
      render(html`<${PUX_View} ProtoUX=${this}/>`,Container)
    }

  /**** rerender ****/

    public rerender ():void {
      if (this._View != null) { this._View.rerender() }
    }

  /**** registerWidgetView ****/

    public static registerWidgetView (Name:string, Class:Function):void {
      ProtoUX._WidgetViewRegistry[Name] = Class
    }

  /**** WidgetViewForType ****/

    public static WidgetViewForType (Name:string):Function|undefined {
      return ProtoUX._WidgetViewRegistry[Name]
    }


  }

//------------------------------------------------------------------------------
//--                                 PUX_View                                 --
//------------------------------------------------------------------------------

  class PUX_View extends Component {
    public state:Indexable = { Value:0 }

    public rerender () {
      (this as Component).setState({ Value:this.state.Value+1 })
    }

    public render (PropSet:Indexable):any {
      let ProtoUX = PropSet.ProtoUX
      ProtoUX['_View'] = this                          // this is a hack, I know

      const openScreen = ProtoUX._openScreen

      const openDialogs      = ProtoUX._openDialogs.slice()
      const frontmostDialog  = openDialogs.pop()
      const frontmostIsModal = (frontmostDialog?.isModal == true)

      return html`<div style="
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        <${PUX_ScreenView} ProtoUX=${ProtoUX} Screen=${openScreen}/>
        ${openDialogs.map((Dialog:Indexable) => {
          return html`<${PUX_DialogView} ProtoUX=${ProtoUX} Dialog=${Dialog} key=${Dialog.Name}/>`
        })}
        ${frontmostIsModal ? html`<${PUX_ModalLayer}/>` : ''}
        ${frontmostDialog == null
          ? ''
          : html`<${PUX_DialogView} ProtoUX=${ProtoUX} Dialog=${frontmostDialog} key=${frontmostDialog.Name}/>`
        }
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                              PUX_ScreenView                              --
//------------------------------------------------------------------------------

  class PUX_ScreenView extends Component {
    public render (PropSet:Indexable):any {
      const Screen = PropSet.Screen
      Screen['View'] = this                            // this is a hack, I know

      const { Id, Classes,Style, Width,Height, WidgetList } = Screen

      return html`<div class=${ClassesWith('PUX Screen',Classes)} id=${Id} style="
        width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        ${WidgetList.map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
        )}
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                             PUX_ModalLayer                             --
//------------------------------------------------------------------------------

  class PUX_ModalLayer extends Component {
    public render (PropSet:Indexable):any {
      const { Style } = PropSet

      function onClick (Event:MouseEvent):void {
        Event.stopImmediatePropagation()
        Event.preventDefault()
      }

      return html`<div class="PUX ModalLayer" style="
        ${Style || ''};
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
      " onClick=${onClick}/>`
    }
  }

//------------------------------------------------------------------------------
//--                              PUX_DialogView                              --
//------------------------------------------------------------------------------

  class PUX_DialogView extends Component {
    public render (PropSet:Indexable):any {
      const Dialog = PropSet.Dialog
      if (Dialog.Type === 'ResizableDialog') {
        return html`<${PUX_ResizableDialogView} Dialog=${Dialog} ProtoUX=${PropSet.ProtoUX}/>`
      } else {
        return html`<${PUX_StandardDialogView}  Dialog=${Dialog} ProtoUX=${PropSet.ProtoUX}/>`
      }
    }
  }

//------------------------------------------------------------------------------
//--                          PUX_StandardDialogView                          --
//------------------------------------------------------------------------------

  class PUX_StandardDialogView extends Component {
    public state:Indexable = { Value:0 }

    public rerender () {
      (this as Component).setState({ Value:this.state.Value+1 })
    }

    public render (PropSet:Indexable):any {
      const Dialog = PropSet.Dialog
      Dialog.View = this

      const moveDialog = (x:number,y:number, dx:number,dy:number) => {
        Dialog.x = Dialog._DragOffset.x + dx
        Dialog.y = Dialog._DragOffset.y + dy
        Dialog.z = 1000                 // brings dialog to front while dragging
        PropSet.ProtoUX.View.rerender()
//      this.rerender() // does not seem to work for any reason
      }

      const moveDialogAndFinish = (x:number,y:number, dx:number,dy:number) => {
        moveDialog(x,y, dx,dy)
        Dialog.z = 0
        PropSet.ProtoUX.bringDialogToFront(Dialog.Name)
      }

      const DragRecognizer = DragRecognizerFor(Dialog, {
        neverFrom:      '.CloseButton',
        Threshold:      4,
        onDragStarted:  (x:number,y:number, dx:number,dy:number) => {
          Dialog._DragOffset = { x:Dialog.x, y:Dialog.y }
          moveDialog(x,y, dx,dy)
        },
        onDragContinued: moveDialog,
        onDragFinished:  moveDialogAndFinish,
        onDragCancelled: moveDialogAndFinish,
      })

      const {
        Id, Classes,Style, x,y,z, Width,Height, Title,
        View, WidgetList, ...otherProps
      } = Dialog

      const CSSGeometry = (
        `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
      )

      function onClose (Event:MouseEvent) {
        Event.stopImmediatePropagation()
        Event.preventDefault()

        PropSet.ProtoUX.closeDialog(Dialog.Name)
      }

      return html`<div class=${ClassesWith('PUX Dialog',Classes)} id=${Id} style="
        ${Style || ''}; ${CSSGeometry}; z-index:${z || 0};
      " ...${otherProps}>
        <div class="Titlebar"
          onPointerDown=${DragRecognizer} onPointerUp=${DragRecognizer}
          onPointerMove=${DragRecognizer} onPointerCancel=${DragRecognizer}
        >
          <div class="Title">${Title}</div>
          <img class="CloseButton" src="${PropSet.ProtoUX._ImageFolder}/xmark.png"
            onClick=${onClose}/>
        </div>

        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
        )}
      </>`
    }
  }

//------------------------------------------------------------------------------
//--                         PUX_ResizableDialogView                          --
//------------------------------------------------------------------------------

  class PUX_ResizableDialogView extends Component {
    public state:Indexable = { Value:0 }

    public rerender () {
      (this as Component).setState({ Value:this.state.Value+1 })
    }

    public render (PropSet:Indexable):any {
      const Dialog = PropSet.Dialog
      Dialog.View = this

      let {
        Id, Classes,Style, x,y,z, Width,Height, Title,
        minWidth, minHeight, maxWidth, maxHeight,
        View, WidgetList, ...otherProps
      } = Dialog

      allowOrdinal('minimal width', minWidth)
      allowOrdinal('maximal width', maxWidth)
      allowOrdinal('minimal height',minHeight)
      allowOrdinal('maximal height',maxHeight)

      if (minWidth  == null) { minWidth  = 120 }
      if (maxWidth  == null) { maxWidth  = Infinity }
      if (minHeight == null) { minHeight = 80 }
      if (maxHeight == null) { maxHeight = Infinity }

      minWidth  = Math.max(0,minWidth)
      maxWidth  = Math.max(minWidth,maxWidth)
      minHeight = Math.max(0,minHeight)
      maxHeight = Math.max(minHeight,maxHeight)

      const handleDrag = (x:number,y:number, dx:number,dy:number) => {
        if (Dialog._DragMode === 'drag') {
          moveDialog(dx,dy)
        } else {
          resizeDialog(dx,dy)
        }
        Dialog.z = 1000                 // brings dialog to front while dragging
        PropSet.ProtoUX.View.rerender()
//      this.rerender() // does not seem to work for any reason
      }

      const handleDragAndFinish = (x:number,y:number, dx:number,dy:number) => {
        handleDrag(x,y, dx,dy)
        Dialog.z = 0
        PropSet.ProtoUX.bringDialogToFront(Dialog.Name)
      }

      const moveDialog = (dx:number,dy:number) => {
        Dialog.x = Dialog._DragOffset.x + dx
        Dialog.y = Dialog._DragOffset.y + dy
      }

      const resizeDialog = (dx:number,dy:number) => {
        switch (Dialog._DragMode) {
          case 'resize-sw':
            let newWidth =  Math.max(minWidth,Math.min(Dialog._DragOffset.Width - dx,maxWidth))
              dx = newWidth - Dialog._DragOffset.Width
            Dialog.x     = Dialog._DragOffset.x     - dx
            Dialog.Width = Dialog._DragOffset.Width + dx
            break
          case 'resize-se':
            Dialog.Width = Math.max(minWidth,Math.min(Dialog._DragOffset.Width + dx,maxWidth))
        }
        Dialog.Height = Math.max(minHeight,Math.min(Dialog._DragOffset.Height + dy,maxHeight))
      }

      const DragRecognizer = DragRecognizerFor(Dialog, {
        onlyFrom:       '.Titlebar,.leftResizer,.middleResizer,.rightResizer',
        neverFrom:      '.CloseButton',
        Threshold:      4,
        onDragStarted:  (x:number,y:number, dx:number,dy:number, Event:PointerEvent) => {
          let ClassList = (Event.target as HTMLElement).classList; Dialog._DragMode = undefined
          switch (true) {
            case ClassList.contains('leftResizer'):   Dialog._DragMode = 'resize-sw'; break
            case ClassList.contains('middleResizer'): Dialog._DragMode = 'resize-s';  break
            case ClassList.contains('rightResizer'):  Dialog._DragMode = 'resize-se'; break
            default:                                  Dialog._DragMode = 'drag'
          }
          Dialog._DragOffset = {
            x:Dialog.x, Width:Dialog.Width,
            y:Dialog.y, Height:Dialog.Height
          }
          handleDrag(x,y, dx,dy)
        },
        onDragContinued: handleDrag,
        onDragFinished:  handleDragAndFinish,
        onDragCancelled: handleDragAndFinish,
      })

      function onClose (Event:MouseEvent) {
        Event.stopImmediatePropagation()
        Event.preventDefault()

        PropSet.ProtoUX.closeDialog(Dialog.Name)
      }

      const CSSGeometry = (
        `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
      )

      return html`<div class=${ClassesWith('PUX ResizableDialog',Classes)} id=${Id} style="
        ${Style || ''}; ${CSSGeometry}; z-index:${z || 0};
      " ...${otherProps}>
        <div class="ContentPane">
          ${(WidgetList || []).map(
            (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
          )}
        </div>

        <div class="Titlebar"
          onPointerDown=${DragRecognizer} onPointerUp=${DragRecognizer}
          onPointerMove=${DragRecognizer} onPointerCancel=${DragRecognizer}
        >
          <div class="Title">${Title}</div>
          <img class="CloseButton" src="${PropSet.ProtoUX._ImageFolder}/xmark.png"
            onClick=${onClose}/>
        </div>

        <div class="leftResizer"
          onPointerDown=${DragRecognizer} onPointerUp=${DragRecognizer}
          onPointerMove=${DragRecognizer} onPointerCancel=${DragRecognizer}
        />
        <div class="middleResizer"
          onPointerDown=${DragRecognizer} onPointerUp=${DragRecognizer}
          onPointerMove=${DragRecognizer} onPointerCancel=${DragRecognizer}
        />
        <div class="rightResizer"
          onPointerDown=${DragRecognizer} onPointerUp=${DragRecognizer}
          onPointerMove=${DragRecognizer} onPointerCancel=${DragRecognizer}
        />
      </>`
    }
  }

//------------------------------------------------------------------------------
//--                              PUX_WidgetView                              --
//------------------------------------------------------------------------------

  class PUX_WidgetView extends Component {
    public state:Indexable = { Value:0 }

    public rerender () {
      (this as Component).setState({ Value:this.state.Value+1 })
    }

    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      if ((PropSet.hidden == true) || (Widget.hidden == true)) {
        return ''
      }

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, hidden,View,
        WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      switch (Widget.Type) {
        case 'Group':                                  // an invisible container
          return html`<div class="PUX Widget ${Classes}" id=${Id} style="${CSSGeometry} ${Style || ''}" ...${otherProps}>
            ${(WidgetList || []).map(
              (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
            )}
          </div>`
//      case 'Container':                            // a box with inner widgets
        case 'Box':                                 // without any inner widgets
          return html`<div class="PUX Widget ${Classes}" id=${Id} style="
            ${CSSGeometry} ${Style || ''}
          " ...${otherProps} key=${Widget.Name}/>`
        default:                         // default rendering like a "container"
          const WidgetView = ProtoUX.WidgetViewForType(Widget.Type)
          if (WidgetView == null) {
            const {
              Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, hidden,View,
              WidgetList, ...otherProps
            } = Widget

            return html`<div class="PUX Widget ${Classes}" id=${Id} style="
              ${CSSGeometry} ${Style || ''}
            " ...${otherProps}>
              ${Value || ''}
              ${(WidgetList || []).map(
                (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
              )}
            </div>`
          } else {
            return html`<${WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX} key=${Widget.Name}/>`
          }
      }
    }
  }

//------------------------------------------------------------------------------
//--                         PUX_horizontalSeparator                          --
//------------------------------------------------------------------------------

  class PUX_horizontalSeparator extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX horizontalSeparator Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}/>`
    }
  }
  ProtoUX.registerWidgetView('horizontalSeparator',PUX_horizontalSeparator)

//------------------------------------------------------------------------------
//--                          PUX_verticalSeparator                           --
//------------------------------------------------------------------------------

  class PUX_verticalSeparator extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX verticalSeparator Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}/>`
    }
  }
  ProtoUX.registerWidgetView('verticalSeparator',PUX_verticalSeparator)

//------------------------------------------------------------------------------
//--                                PUX_Badge                                 --
//------------------------------------------------------------------------------

  class PUX_Badge extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      Value = (''+(Value || '')).trim()
      switch (true) {
        case (Value === ''):     return ''
        case (Value.length > 1): Value = '#'
        default: return html`<div class=${ClassesWith('PUX Badge Widget',Classes)} id=${Id} style="
          ${CSSGeometry} ${Style || ''}
        " ...${otherProps}>${Value}</div>`
      }
    }
  }
  ProtoUX.registerWidgetView('Badge',PUX_Badge)

//------------------------------------------------------------------------------
//--                               PUX_HTMLView                               --
//------------------------------------------------------------------------------

  class PUX_HTMLView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX HTMLView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}
        dangerouslySetInnerHTML=${{__html:Value}}
      />`
    }
  }
  ProtoUX.registerWidgetView('HTMLView',PUX_HTMLView)

//------------------------------------------------------------------------------
//--                               PUX_TextView                               --
//------------------------------------------------------------------------------

  class PUX_TextView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX TextView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>${Value}</>`
    }
  }
  ProtoUX.registerWidgetView('TextView',PUX_TextView)

//------------------------------------------------------------------------------
//--                              PUX_ImageView                               --
//------------------------------------------------------------------------------

  class PUX_ImageView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        ImageScaling, ImageAlignment, WidgetList, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<img class=${ClassesWith('PUX ImageView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''};
        object-fit:${ImageScaling === 'stretch' ? 'fill ' : ImageScaling};
        object-position:${ImageAlignment};
      " ...${otherProps} src=${Value}/>`
    }
  }
  ProtoUX.registerWidgetView('ImageView',PUX_ImageView)

//------------------------------------------------------------------------------
//--                               PUX_WebView                                --
//------------------------------------------------------------------------------

  class PUX_WebView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        PermissionsPolicy, allowsFullscreen, SandboxPermissions,
        ReferrerPolicy, WidgetList, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      const DefaultSandboxPermissions = (
        'allow-downloads allow-forms allow-modals allow-orientation-lock ' +
        'allow-pointer-lock allow-popups allow-same-origin allow-scripts'
      )

      return html`<iframe class=${ClassesWith('PUX WebView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps} src=${Value}
        allow=${PermissionsPolicy} allowfullscreen=${allowsFullscreen}
        sandbox=${SandboxPermissions || DefaultSandboxPermissions}
        referrerpolicy=${ReferrerPolicy}
      />`
    }
  }
  ProtoUX.registerWidgetView('WebView',PUX_WebView)

//------------------------------------------------------------------------------
//--                                 PUX_Icon                                 --
//------------------------------------------------------------------------------

  class PUX_Icon extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,Color,
        disabled, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let PUX = PropSet.ProtoUX, ImageFolder = PUX.ImageFolder
      if ((Value != null) && (Value.trim() !== '')) {
        Value = Value.trim().replace(/url\("\/images\//g,'url("'+ImageFolder)
      }

      return html`<div class=${ClassesWith('PUX Icon Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " disabled=${disabled}><div style="
        display:block; position:absolute;
        left:0px; top:0px; width:100%; height:100%;
        -webkit-mask-image:${Value};         mask-image:${Value};
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
        background-color:${Color || 'black'};
      " ...${otherProps}/></>`
    }
  }
  ProtoUX.registerWidgetView('Icon',PUX_Icon)

//------------------------------------------------------------------------------
//--                            PUX_PseudoDropDown                            --
//------------------------------------------------------------------------------

  class PUX_PseudoDropDown extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height,
        Value,Color,Options, onInput, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let PUX = PropSet.ProtoUX, ImageFolder = PUX.ImageFolder
      if ((Value != null) && (Value.trim() !== '')) {
        Value = Value.trim().replace(/url\("\/images\//g,'url("'+ImageFolder)
      }

      return html`<div class=${ClassesWith('PUX PseudoDropDown Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      "><div style="
        display:block; position:absolute;
        left:0px; top:0px; width:100%; height:100%;
        -webkit-mask-image:${Value};         mask-image:${Value};
        -webkit-mask-size:contain;           mask-size:contain;
        -webkit-mask-position:center center; mask-position:center center;
        background-color:${Color || 'black'};
      " ...${otherProps}/>
        <select onInput=${onInput}>
          <option value="" disabled selected>please select</option>
          ${(Options || []).map(
            (Option:string) => html`<option>${Option}</>`
          )}
        </select>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('PseudoDropDown',PUX_PseudoDropDown)

//------------------------------------------------------------------------------
//--                              PUX_Button                               --
//------------------------------------------------------------------------------

  class PUX_Button extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX Button Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <button ...${otherProps}>${Value || ''}</button>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Button',PUX_Button)

//------------------------------------------------------------------------------
//--                               PUX_Checkbox                               --
//------------------------------------------------------------------------------

  class PUX_Checkbox extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let { checked,indeterminate } = PropSet
      if (checked       == null) { checked       = (Value == true)}
      if (indeterminate == null) { indeterminate = (Value == null) }

      return html`<div class=${ClassesWith('PUX Checkbox Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <input type="checkbox" checked=${checked} indeterminate=${indeterminate} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Checkbox',PUX_Checkbox)

//------------------------------------------------------------------------------
//--                             PUX_Radiobutton                              --
//------------------------------------------------------------------------------

  class PUX_Radiobutton extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let { checked } = PropSet
      if (checked == null) { checked = (Value == true)}

      return html`<div class=${ClassesWith('PUX Radiobutton Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <input type="radio" checked=${checked} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Radiobutton',PUX_Radiobutton)

//------------------------------------------------------------------------------
//--                                PUX_Gauge                                 --
//------------------------------------------------------------------------------

  class PUX_Gauge extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX Gauge Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <meter value=${Value || ''} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Gauge',PUX_Gauge)

//------------------------------------------------------------------------------
//--                             PUX_Progressbar                              --
//------------------------------------------------------------------------------

  class PUX_Progressbar extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX Progressbar Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <progress value=${Value || ''} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Progressbar',PUX_Progressbar)

//------------------------------------------------------------------------------
//--                                PUX_Slider                                --
//------------------------------------------------------------------------------

  const HashmarkPattern = /^\s*(\d+(?:[.]\d+)?|\d*[.](?:\d*))(?:\s*:\s*([^\x00-\x1F\x7F-\x9F\u2028\u2029\uFFF9-\uFFFB]+))?$/

  class PUX_Slider extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Hashmarks,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let HashmarkList:any = '', HashmarkId
      if (Array.isArray(Hashmarks) && (Hashmarks.length > 0)) {
        HashmarkId = Id + '-Hashmarks'

        HashmarkList = html`\n<datalist id=${HashmarkId}>
          ${Hashmarks.map((Item:string) => {
            const Label = Item.replace(/:.*$/,'').trim()
            const Value = Item.replace(/^[^:]+:/,'').trim()

            return html`<option label=${Label} value=${Value}></option>`
          })}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX Slider Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${HashmarkId}>
        <input type="range" value=${Value || ''} ...${otherProps}/>
      </div>${HashmarkList}`
    }
  }
  ProtoUX.registerWidgetView('Slider',PUX_Slider)

//------------------------------------------------------------------------------
//--                            PUX_TextlineInput                             --
//------------------------------------------------------------------------------

  class PUX_TextlineInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX TextlineInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="text" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('TextlineInput',PUX_TextlineInput)

//------------------------------------------------------------------------------
//--                            PUX_PasswordInput                             --
//------------------------------------------------------------------------------

  class PUX_PasswordInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX PasswordInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <input type="password" value=${Value || ''} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('PasswordInput',PUX_PasswordInput)

//------------------------------------------------------------------------------
//--                             PUX_NumberInput                              --
//------------------------------------------------------------------------------

  class PUX_NumberInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX NumberInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="number" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('NumberInput',PUX_NumberInput)

//------------------------------------------------------------------------------
//--                           PUX_PhoneNumberInput                           --
//------------------------------------------------------------------------------

  class PUX_PhoneNumberInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX PhoneNumberInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="tel" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('PhoneNumberInput',PUX_PhoneNumberInput)

//------------------------------------------------------------------------------
//--                          PUX_EMailAddressInput                           --
//------------------------------------------------------------------------------

  class PUX_EMailAddressInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX EMailAddressInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="email" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('EMailAddressInput',PUX_EMailAddressInput)

//------------------------------------------------------------------------------
//--                               PUX_URLInput                               --
//------------------------------------------------------------------------------

  class PUX_URLInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX URLInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="url" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('URLInput',PUX_URLInput)

//------------------------------------------------------------------------------
//--                              PUX_TimeInput                               --
//------------------------------------------------------------------------------

  class PUX_TimeInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX TimeInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="time" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('TimeInput',PUX_TimeInput)

//------------------------------------------------------------------------------
//--                            PUX_DateTimeInput                             --
//------------------------------------------------------------------------------

  class PUX_DateTimeInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX DateTimeInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="datetime-local" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('DateTimeInput',PUX_DateTimeInput)

//------------------------------------------------------------------------------
//--                              PUX_DateInput                               --
//------------------------------------------------------------------------------

  class PUX_DateInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX DateInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="date" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('DateInput',PUX_DateInput)

//------------------------------------------------------------------------------
//--                              PUX_WeekInput                               --
//------------------------------------------------------------------------------

  class PUX_WeekInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX WeekInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="week" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('WeekInput',PUX_WeekInput)

//------------------------------------------------------------------------------
//--                              PUX_MonthInput                              --
//------------------------------------------------------------------------------

  class PUX_MonthInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX MonthInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="month" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('MonthInput',PUX_MonthInput)

//------------------------------------------------------------------------------
//--                             PUX_SearchInput                              --
//------------------------------------------------------------------------------

  class PUX_SearchInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX SearchInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="search" value=${Value || ''} ...${otherProps}/>
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('SearchInput',PUX_SearchInput)

//------------------------------------------------------------------------------
//--                              PUX_FileInput                               --
//------------------------------------------------------------------------------

  class PUX_FileInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, View,
        Placeholder, onDrop, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      function onDragEnter (Event:Event):void {
        Event.stopPropagation()
        Event.preventDefault()
      }

      function onDragOver (Event:Event):void {
        Event.stopPropagation()
        Event.preventDefault()
      }

      function onFileDrop (Event:Event):void {// leaves "onDrop" free as a Prop.
        Event.stopPropagation()
        Event.preventDefault()

        if (typeof onDrop === 'function') { onDrop(Event) }
      }               // nota bene: "files" is now in "Event.dataTransfer.files"

      return html`<label class=${ClassesWith('PUX FileInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onFileDrop}>
        <input type="file" style="display:none" ...${otherProps}/>
        ${(Value || '') === '' ? '' : html`<span>${Value}</span>`}
        ${(Value || '') === '' ? ((Placeholder || '') === '' ? '' : html`<span>${Placeholder}</span>`) : ''}
      </label>`
    }
  }
  ProtoUX.registerWidgetView('FileInput',PUX_FileInput)

//------------------------------------------------------------------------------
//--                              PUX_ColorInput                              --
//------------------------------------------------------------------------------

  class PUX_ColorInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, Suggestions,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      let SuggestionList:any = '', SuggestionId
      if (Array.isArray(Suggestions) && (Suggestions.length > 0)) {
        SuggestionId = Id + '-Suggestions'

        SuggestionList = html`<datalist id=${SuggestionId}>
          ${Suggestions.map((Value:string) => html`<option value=${Value}></option>`)}
        </datalist>`
      }

      return html`<div class=${ClassesWith('PUX ColorInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " list=${SuggestionId}>
        <input type="color" value=${Value || ''} ...${otherProps} />
      </div>${SuggestionList}`
    }
  }
  ProtoUX.registerWidgetView('ColorInput',PUX_ColorInput)

//------------------------------------------------------------------------------
//--                               PUX_DropDown                               --
//------------------------------------------------------------------------------

  class PUX_DropDown extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,Options, Placeholder,
        View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX DropDown Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <select ...${otherProps}>
          ${Placeholder == null
            ? ''
            : html`<option value="" disabled>${Placeholder}</option>`
          }
          ${(Options || []).map(
            (Option:string) => html`<option selected=${Option === Value}>${Option}</>`
          )}
        </select>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('DropDown',PUX_DropDown)

//------------------------------------------------------------------------------
//--                              PUX_TextInput                               --
//------------------------------------------------------------------------------

  class PUX_TextInput extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX TextInput Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        <textarea ...${otherProps} value=${Value || ''}></textarea>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('TextInput',PUX_TextInput)

//------------------------------------------------------------------------------
//--                             PUX_FileDropArea                             --
//------------------------------------------------------------------------------

  class PUX_FileDropArea extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, onDrop,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      function onDragEnter (Event:Event):void {
        Event.stopPropagation()
        Event.preventDefault()
      }

      function onDragOver (Event:Event):void {
        Event.stopPropagation()
        Event.preventDefault()
      }

      function onFileDrop (Event:Event):void {// leaves "onDrop" free as a Prop.
        Event.stopPropagation()
        Event.preventDefault()

        if (typeof onDrop === 'function') { onDrop(Event) }
      }               // nota bene: "files" is now in "Event.dataTransfer.files"

      return html`<label class=${ClassesWith('PUX FileDropArea Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " onDragEnter=${onDragEnter} onDragOver=${onDragOver} onDrop=${onFileDrop}>
        <input type="file" ...${otherProps}/>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </label>`
    }
  }
  ProtoUX.registerWidgetView('FileDropArea',PUX_FileDropArea)

//------------------------------------------------------------------------------
//--                              PUX_Accordion                               --
//------------------------------------------------------------------------------

  class PUX_Accordion extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX Accordion Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_Fold} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </>`
    }
  }
  ProtoUX.registerWidgetView('Accordion',PUX_Accordion)

//------------------------------------------------------------------------------
//--                                 PUX_Fold                                 --
//------------------------------------------------------------------------------

  class PUX_Fold extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,Expansion,
        View, WidgetList, ...otherProps
      } = Widget

      const self = this
      function onClick () {
        Widget.Expansion = ! Widget.Expansion
        self.rerender()
      }

      return html`<div class=${ClassesWith('PUX Fold Widget',Classes)} id=${Id} style="
        ${Style || ''}; left:0px; top:0px; width:100%; height:auto;
      " ...${otherProps}>
        <div class="PUX Fold-Header">
          <img class="PUX Fold-Expander" src=${Expansion
            ? `${PropSet.ProtoUX._ImageFolder}caret-down.png`
            : `${PropSet.ProtoUX._ImageFolder}caret-right.png`
          } onClick=${onClick}
          />
          <div class="PUX Fold-Title">${Value}</>
        </div>

        ${Expansion
          ? html`<div class="PUX Fold-Content" style="
              height:${Height}px; border:none;
            ">
              ${(WidgetList || []).map(
                (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
              )}
            </>`
          : ''
        }
      </>`
    }
  }
  ProtoUX.registerWidgetView('Fold',PUX_Fold)

//------------------------------------------------------------------------------
//--                                 PUX_Deck                                 --
//------------------------------------------------------------------------------

  class PUX_Deck extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      const activeIndex = (
        Value == null ? 0 : (Value < 0 ? WidgetList.length+Value : Value)
      )
      const activeCard = WidgetList[activeIndex] || WidgetList[0]

      return html`<div class=${ClassesWith('PUX Deck Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>
        ${activeCard == null
          ? html`<${PUX_centered}><span>(no card)</span></>`
          : html`<${PUX_Card} Widget=${activeCard} ProtoUX=${PropSet.ProtoUX}/>`
        }
      </>`
    }
  }
  ProtoUX.registerWidgetView('Deck',PUX_Deck)

//------------------------------------------------------------------------------
//--                                 PUX_Card                                 --
//------------------------------------------------------------------------------

  class PUX_Card extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      return html`<div class=${ClassesWith('PUX Card Widget',Classes)} id=${Id} style="
        border:none; ${Style || ''};
        left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto
      " ...${otherProps}>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </>`
    }
  }
  ProtoUX.registerWidgetView('Card',PUX_Card)

//------------------------------------------------------------------------------
//--                              PUX_TabStrip                               --
//------------------------------------------------------------------------------

  class PUX_TabStrip extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      const activeIndex = (
        Value == null ? 0 : (Value < 0 ? WidgetList.length+Value : Value)
      )
      const activeTab = WidgetList[activeIndex] || WidgetList[0]

      const self = this as Component
      function activateTab (Index:number):void {
        (self.base as HTMLElement).dispatchEvent(new CustomEvent('ValueChange',{ detail:Index }))
      }

      return html`<div class=${ClassesWith('PUX TabStrip Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>
        ${(WidgetList || []).map((Widget:Indexable, Index:number) => html`
          <${PUX_Tab} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}
            active=${Widget === activeTab}
            onClick=${() => activateTab(Index)}
          />
        `
        )}
      </>`
    }
  }
  ProtoUX.registerWidgetView('TabStrip',PUX_TabStrip)

//------------------------------------------------------------------------------
//--                                 PUX_Tab                                  --
//------------------------------------------------------------------------------

  class PUX_Tab extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,
        View, WidgetList, ...otherProps
      } = Widget

      const { active,onClick } = PropSet

      return html`<div class=${ClassesWith('PUX ${active ? "active" : ""} Tab Widget',Classes)} id=${Id} style="
        ${Style || ''}; width:${Width}px; border:none; border-width:0px 0px 4px 0px;
        border-style:solid; border-bottom-color:${active ? 'black' : 'transparent'}
      " ...${otherProps} onClick=${onClick}>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Tab',PUX_Tab)

//------------------------------------------------------------------------------
//--                             PUX_FlatListView                             --
//------------------------------------------------------------------------------

  class PUX_FlatListView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height,
        List, ItemRenderer, Placeholder, selectedIndices, SelectionLimit,
        onSelectionChange, onItemSelected, onItemDeselected,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      expectArray                       ('item list',List)
      allowFunction            ('list item renderer',ItemRenderer)
      allowTextline              ('list placeholder',Placeholder)
      allowListSatisfying('list of selected indices',selectedIndices, ValueIsOrdinal)
      allowOrdinal                ('selection limit',SelectionLimit)
      allowFunction     ('selection change callback',onSelectionChange)
      allowFunction       ('item selection callback',onItemSelected)
      allowFunction     ('item deselection callback',onItemDeselected)

      if (ItemRenderer    == null) { ItemRenderer    = (Item:any) => html`${Item+''}` }
      if (Placeholder     == null) { Placeholder     = '(empty)' }
      if (selectedIndices == null) { selectedIndices = [] }
      if (SelectionLimit  == null) { SelectionLimit  = 1 }

      const selectedIndexSet:Indexable = Object.create(null)
        selectedIndices = selectedIndices.filter((selectedIndex:number) => {
          if (
            ValueIsOrdinal(selectedIndex) &&
            (selectedIndex >= 0) && (selectedIndex < List.length) &&
            ! (selectedIndex in selectedIndexSet)
          ) {
            selectedIndexSet[selectedIndex] = true
            return true
          } else {
            return false
          }
        })
      if (selectedIndices.length > SelectionLimit) {
        const deselectedIndices = selectedIndices.slice(SelectionLimit)

        selectedIndices.length = SelectionLimit
        if (onSelectionChange != null) {
          onSelectionChange(selectedIndices)
        }

        if (onItemDeselected != null) {
          deselectedIndices.forEach((deselectedIndex:number) => {
            onItemDeselected(List[deselectedIndex],deselectedIndex)
          })
        }
      }

      function onClick (Event:MouseEvent, Index:number):void {
        Event.stopImmediatePropagation()
        Event.preventDefault()

        if (SelectionLimit === 0) { return }

        let SelectionChanged:boolean = false
        let IndicesToSelect:number[], IndicesToDeselect:number[]
        if (Event.shiftKey || Event.metaKey) {
          SelectionChanged = true
          if (ItemIsSelected(Index)) {
            IndicesToDeselect = [Index]
            selectedIndices   = selectedIndices.filter(
              (selectedIndex:number) => (selectedIndex !== Index)
            )
          } else {
            if (selectedIndices.length === SelectionLimit) {
              IndicesToDeselect = [selectedIndices.shift()]
            }
            IndicesToSelect = [Index]
            selectedIndices.push(Index)
          }
        } else {
          IndicesToDeselect = selectedIndices.filter(
            (selectedIndex:number) => (selectedIndex !== Index)
          )
          SelectionChanged = ! ItemIsSelected(Index)
          IndicesToSelect  = (SelectionChanged ? [Index] : [])
          selectedIndices  = [Index]
        }

        if (SelectionChanged && (onSelectionChange != null)) {
          onSelectionChange(selectedIndices)
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToDeselect != null) && (onItemDeselected != null)) {
          IndicesToDeselect.forEach((deselectedIndex:number) => {
            onItemDeselected(List[deselectedIndex],deselectedIndex)
          })
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((IndicesToSelect != null) && (onItemSelected != null)) {
          IndicesToSelect.forEach((selectedIndex:number) => {
            onItemSelected(List[selectedIndex],selectedIndex)
          })
        }
      }

      function ItemIsSelected (Index:number):boolean {
        return (Index in selectedIndexSet)
      }

      return html`<div class=${ClassesWith('PUX FlatListView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>
        ${
          List.length === 0
          ? html`<div class="centered"><span>${Placeholder}</></>`
          : List.map((Item:any, Index:number) => html`<div
              class=${ItemIsSelected(Index) ? 'selected' : undefined}
              dangerouslySetInnerHTML=${{
                __html:ItemRenderer(Item, Index, ItemIsSelected(Index))
              }}
              onClick=${(Event:MouseEvent) => onClick(Event,Index)}
            />`)
        }
      </>`
    }
  }
  ProtoUX.registerWidgetView('FlatListView',PUX_FlatListView)

//------------------------------------------------------------------------------
//--                             PUX_NestedListView                             --
//------------------------------------------------------------------------------

  class PUX_NestedListView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height,
        List, ItemRenderer, Placeholder, LabelOfItem, ContentListOfItem,
        selectedPaths, SelectionLimit, SelectionMode,
        onSelectionChange, onItemSelected, onItemDeselected,
        onItemDoubleClicked,
        expandedPaths, Indentation,
        onExpansionChange, onItemExpanded, onItemCollapsed,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      function ValueIsOrdinalList (Value:any):boolean {
        return ValueIsListSatisfying(Value,ValueIsOrdinal)
      }

      expectArray                     ('item list',List)
      allowFunction          ('list item renderer',ItemRenderer)
      allowTextline            ('list placeholder',Placeholder)
      expectFunction  ('label extraction function',LabelOfItem)
      expectFunction('content extraction function',ContentListOfItem)
      allowListSatisfying('list of selected paths',selectedPaths, ValueIsOrdinalList)
      allowOrdinal              ('selection limit',SelectionLimit)
      allowOneOf                 ('selection mode',SelectionMode, ['same-container','any-container'])
      allowFunction   ('selection change callback',onSelectionChange)
      allowFunction     ('item selection callback',onItemSelected)
      allowFunction   ('item deselection callback',onItemDeselected)
      allowFunction  ('item double-click callback',onItemDoubleClicked)
      allowListSatisfying('list of expanded paths',expandedPaths, ValueIsOrdinalList)
      allowOrdinal                  ('indentation',Indentation)
      allowFunction   ('expansion change callback',onExpansionChange)
      allowFunction     ('item expansion callback',onItemExpanded)
      allowFunction      ('item collapse callback',onItemCollapsed)

      function DefaultRenderer (Item:any, Path:number[]):any {
        return html`<div class="ItemLabel">${LabelOfItem(Item)}</div>`
      }

      if (ItemRenderer   == null) { ItemRenderer   = DefaultRenderer }
      if (Placeholder    == null) { Placeholder    = '(empty)' }
      if (selectedPaths  == null) { selectedPaths  = [] }
      if (SelectionLimit == null) { SelectionLimit = 1 }
      if (SelectionMode  == null) { SelectionMode  = 'same-container' }
      if (expandedPaths  == null) { expandedPaths  = [] }
      if (Indentation    == null) { Indentation    = 10 }

      function ItemAtPath (Path:number[]):any {
        let Item:any = List[Path[0]]
          for (let i = 1, l = Path.length; i < l; i++) {
            if (Item == null) { return undefined }

            const ContentList = ContentListOfItem(Item)
            if (! ValueIsArray(ContentList)) { return undefined }

            Item = ContentList[Path[i]]
          }
        return Item
      }

      function ItemAtPathExists (Path:number[]):boolean {
        return (ItemAtPath(Path) != null)
      }

      function PathsAreEqual (PathA:number[],PathB:number[]):boolean {
        return (
          (PathA.length === PathB.length) &&
          PathA.every((Item,Index) => Item === PathB[Index])
        )
      }

      function IndexOfPathIn (Path:number[],PathList:number[][]):number {
        for (let i = 0, l = PathList.length; i < l; i++) {
          if (PathsAreEqual(Path,PathList[i])) { return i }
        }
        return -1
      }

      function ItemInContainer (ItemPath:number[],ContainerPath:number[]):boolean {
        return (
          (ItemPath.length === ContainerPath.length+1) &&
          PathsAreEqual(ItemPath.slice(0,ContainerPath.length),ContainerPath)
        )
      }

      function ItemNotInContainer (ItemPath:number[],ContainerPath:number[]):boolean {
        return (
          (ItemPath.length !== ContainerPath.length+1) ||
          ! PathsAreEqual(ItemPath.slice(0,ContainerPath.length),ContainerPath)
        )
      }

      function ItemIsSelected (Path:number[]):boolean { return (IndexOfPathIn(Path,selectedPaths) >= 0) }
      function ItemIsExpanded (Path:number[]):boolean { return (IndexOfPathIn(Path,expandedPaths) >= 0) }

      selectedPaths = selectedPaths.filter(
        (Path:number[]) => ItemAtPathExists(Path)
      )

      selectedPaths = selectedPaths.filter((Path:number[], Index:number) => (
        IndexOfPathIn(Path,selectedPaths) === Index
      ))

      if ((selectedPaths.length > 1) && (SelectionMode === 'same-container')) {
        const ContainerPath = selectedPaths[0].slice(0,selectedPaths[0].length-1)
        selectedPaths = selectedPaths.filter((Path:number[]) => (
          ItemInContainer(Path,ContainerPath)
        ))
      }

      expandedPaths = expandedPaths.filter(
        (Path:number[]) => ItemAtPathExists(Path)
      )

      expandedPaths = expandedPaths.filter((Path:number[], Index:number) => (
        IndexOfPathIn(Path,expandedPaths) === Index
      ))

      function processSelectionClick (
        Event:PointerEvent, Item:any, ItemPath:number[]
      ):void {
        Event.stopImmediatePropagation()
        Event.preventDefault()

        if (SelectionLimit === 0) { return }

        let SelectionChanged:boolean = false
        let PathsToSelect:number[][], PathsToDeselect:number[][]

        if (Event.shiftKey || Event.metaKey) {
          SelectionChanged = true
          if (ItemIsSelected(ItemPath)) {
            PathsToDeselect = [ItemPath]
            selectedPaths   = selectedPaths.filter(
              (Path:number[]) => ! PathsAreEqual(ItemPath,Path)
            )
          } else {
            const ContainerPath = ItemPath.slice(0,ItemPath.length-1)
            PathsToDeselect = selectedPaths.filter((Path:number[]) => (
              ! ItemInContainer(Path,ContainerPath)
            ))
            selectedPaths = selectedPaths.filter((Path:number[]) => (
              ItemInContainer(Path,ContainerPath)
            ))

            if (selectedPaths.length === SelectionLimit) {
              PathsToDeselect.push([selectedPaths.shift()])
            }
            PathsToSelect = [ItemPath]
            selectedPaths.push(ItemPath)
          }
        } else {
          PathsToDeselect = selectedPaths.filter(
            (Path:number[]) => ! PathsAreEqual(ItemPath,Path)
          )
          SelectionChanged = ! ItemIsSelected(ItemPath)
          PathsToSelect    = (SelectionChanged ? [ItemPath] : [])
          selectedPaths    = [ItemPath]
        }

        if (SelectionChanged && (onSelectionChange != null)) {
          onSelectionChange(selectedPaths)
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((PathsToDeselect != null) && (onItemDeselected != null)) {
          PathsToDeselect.forEach((Path:number[]) => {
            onItemDeselected(ItemAtPath(Path),Path)
          })
        }

// @ts-ignore TS2454 let's check IF variables were assigned
        if ((PathsToSelect != null) && (onItemSelected != null)) {
          PathsToSelect.forEach((Path:number[]) => {
            onItemSelected(ItemAtPath(Path),Path)
          })
        }
      }

      function processDoubleClick (
        Event:PointerEvent, Item:any, ItemPath:number[]
      ):void {
        if (onItemDoubleClicked != null) {
          Event.stopImmediatePropagation()
          Event.preventDefault()

          onItemDoubleClicked(Item,ItemPath,Event)
        }
      }

      function processExpansionClick (
        Event:PointerEvent, Item:any, Path:number[]
      ):void {
        Event.stopImmediatePropagation()
        Event.preventDefault()

        let ExpansionIndex = IndexOfPathIn(Path,expandedPaths)
        if (ExpansionIndex < 0) {
          expandedPaths.push(Path)
        } else {
          expandedPaths.splice(ExpansionIndex,1)
        }

        if (onExpansionChange != null) {
          onExpansionChange(expandedPaths)
        }

        if (ExpansionIndex < 0) {
          if (onItemExpanded  != null) { onItemExpanded(Item,Path) }
        } else {
          if (onItemCollapsed != null) { onItemCollapsed(Item,Path) }
        }
      }

      function renderedItem (Item:any, Path:number[]):any {
        const Offset = (Path.length-1) * Indentation

        const isSelected = ItemIsSelected(Path)
        const isExpanded = ItemIsExpanded(Path)

        let ContentList = ContentListOfItem(Item)
        if (! ValueIsArray(ContentList)) { ContentList = [] }

        const hasContent = (ContentList.length > 0)

        function onSelectionClick (Event:PointerEvent) {
          processSelectionClick(Event, Item,Path)
        }

        function onDoubleClick (Event:PointerEvent) {
          processDoubleClick(Event, Item,Path)
        }

        function onExpansionClick (Event:PointerEvent) {
          processExpansionClick(Event, Item,Path)
        }

        return html`<div class="ItemView" style="padding-left:${Offset}px">
          <div class="ItemLine ${isSelected ? 'selected' : ''}"
            onClick=${onSelectionClick} onDblClick=${onDoubleClick}
          >
            ${hasContent
              ? (isExpanded
                  ? html`<img class="ItemExpander" src="/svg/icons/caret-down.svg"  onClick=${onExpansionClick}/>`
                  : html`<img class="ItemExpander" src="/svg/icons/caret-right.svg" onClick=${onExpansionClick}/>`
                )
              : html`<img class="ItemIcon" src="/svg/icons/circle.svg"/>`
            } ${ItemRenderer(Item,Path)}
          </div>
          ${hasContent && isExpanded
            ? ContentList.map((Item:any, Index:number) => renderedItem(Item,Path.concat(Index)))
            : ''
          }
        </div>`
      }



      return html`<div class=${ClassesWith('PUX NestedListView Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      " ...${otherProps}>
        ${
          List.length === 0
          ? html`<div class="centered"><span>${Placeholder}</></>`
          : List.map((Item:any, Index:number) => renderedItem(Item,[Index]))
        }
      </>`
    }
  }
  ProtoUX.registerWidgetView('NestedListView',PUX_NestedListView)

//------------------------------------------------------------------------------
//--                             PUX_Placeholder                              --
//------------------------------------------------------------------------------

  class PUX_Placeholder extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      let {
        Id, Type,Classes,Style, x,y, Width,Height, Substitute,Placeholder,
        View, WidgetList, ...otherProps
      } = Widget

      allowFunction      ('Substitute',Substitute)
      allowTextline('placeholder text',Placeholder)

      if (Placeholder == null) { Placeholder = '(empty)' }

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class=${ClassesWith('PUX Placeholder Widget',Classes)} id=${Id} style="
        ${CSSGeometry} ${Style || ''}
      ">
        ${Substitute == null
          ? html`<div class="centered"><span>${Placeholder}</></>`
          : html`<${Substitute} ...${otherProps}/>`
        }
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Placeholder',PUX_Placeholder)

/**** ClassesWith ****/

  function ClassesWith (Prefix:string, ClassNames:string):string {
    const ClassSet = Object.create(null)

    const combinedClasses = (
      Prefix + ' ' + (ClassNames || '')
    ).trim().replace(/\s+/g,' ')

    return combinedClasses.split(' ').filter((ClassName:string) => {
      if (ClassName in ClassSet) {
        return false
      } else {
        ClassSet[ClassName] = true
        return true
      }
    }).join(' ')
  }//------------------------------------------------------------------------------
//--                               PUX_centered                               --
//------------------------------------------------------------------------------

  class PUX_centered extends Component {
    public render (PropSet:Indexable):any {
      return html`<div class="centered">
        ${PropSet.children}
      </div>`
    }
  }


