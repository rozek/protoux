/*******************************************************************************
*                                                                              *
*                                ProtoUX (PUX)                                 *
*                                                                              *
*******************************************************************************/

  import {
//  throwError,
    quoted,
    ValueIsPlainObject, ValueIsFunction,
    ValidatorForClassifier, acceptNil, rejectNil,
    allowURL,
  } from 'javascript-interface-library'

  import { render, html, Component } from 'htm/preact'

  import hyperactiv from 'hyperactiv'
  const { observe, computed, dispose } = hyperactiv

/**** make some existing types indexable ****/

  interface Indexable { [Key:string]:any }

/**** install stylesheet for SSS ****/

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

  .PUX.Box { background-color:white }

  .PUX.Title    { font-size:20px; font-weight:normal; padding:0px 0px 0px 0px }
  .PUX.Label    { font-size:14px; font-weight:bold;   padding:4px 0px 0px 0px }
  .PUX.Textline { font-size:14px; font-weight:normal; padding:4px 0px 0px 0px }
  .PUX.Text     { font-size:14px; font-weight:normal; padding:2px 0px 0px 0px }
  .PUX.Hint     { font-size:12px; font-weight:normal; padding:4px 0px 0px 0px }

  .PUX.Button > button, .PUX.Checkbox > input, .PUX.Radiobutton > input,
  .PUX.Gauge > meter, .PUX.Progressbar > progress, .PUX.Slider > input,
  .PUX.TextlineInput > input, .PUX.PasswordInput > input,
  .PUX.NumberInput > input, .PUX.PhoneNumberInput > input,
  .PUX.EMailAddressInput > input, .PUX.URLInput > input,
  .PUX.TimeInput > input, .PUX.DateTimeInput > input, .PUX.DateInput > input,
  .PUX.WeekInput > input, .PUX.MonthInput > input, .PUX.SearchInput > input,
  .PUX.ColorInput > input, .PUX.DropDown > select, .PUX.FileInput > input,
  .PUX.TextInput > textarea {
    display:block; position:absolute;
    left:0px; top:0px; width:100%; height:100%;
  }

  .PUX.Button > button {
    background:white;
    border:solid 1px black; border-radius:4px;
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

  .PUX.TextInput.no-resize > textarea { resize:none }

  .PUX.horizontalSeparator {
    height:1px; margin:0px; margin-top:7px;
    border:none; border-top:solid 1px black
  }
  .PUX.verticalSeparator {
    width:1px; margin:0px; margin-left:7px;
    border:none; border-left:solid 1px black
  }

  .disabled            { opacity:0.3 }
  .readonly            { background:none }
  .no-pointer-events   { pointer-events:none }

  .vertically-centered {
    display:flex; align-items:center;
  }

  .textured { background-image:repeat }

  .scrollable   { overflow:scroll }
  .scrollable-x { overflow-x:scroll; overflow-y:hidden }
  .scrollable-y { overflow-x:hidden; overflow-y:scroll }

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

//------------------------------------------------------------------------------
//--                                 ProtoUX                                  --
//------------------------------------------------------------------------------

  export class ProtoUX {
    private _IdPrefix:string

    private _ImageFolder:string = ''

    private _ScreenSet:Indexable    = {}         // just to satisfy the compiler
    private _observed:Indexable     = observe({})
    private _UpdaterList:Function[] = []

    private _StartScreen:Indexable      = {}     // just to satisfy the compiler
    private _openScreenList:Indexable[] = []

    private _View:PUX_View|undefined

    private static _WidgetViewRegistry:Indexable = Object.create(null)

  /**** constructor ****/

    public constructor (IdPrefix:string = 'PUX') {
      this._IdPrefix = IdPrefix
    }

  /**** ImageFolder - where to find image files ****/

    public get ImageFolder ():string          { return this._ImageFolder }
    public set ImageFolder (newFolder:string) { this._ImageFolder = newFolder }

  /**** Style - represents the CSS stylesheet of a given ProtoUX project ****/

    public get Style ():string {
      const StyleId = this._IdPrefix + '-Style'
      const Element = document.getElementById(StyleId)
      return (Element == null ? '' : Element.innerHTML)
    }

    public set Style (newStyle:string) {
      const StyleId = this._IdPrefix + '-Style'

      let ImageFolder = this._ImageFolder
      if (ImageFolder.trim() !== '') {
        if (! ImageFolder.endsWith('/')) { ImageFolder += '/' }
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
      let Screen = this._ScreenSet[ScreenName]
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

      const WidgetList = Screen.WidgetList
      if (WidgetList.length === 0) { return }

      let minX:number = Infinity, maxX:number = 0
      let minY:number = Infinity, maxY:number = 0
      WidgetList.forEach((Widget:Indexable) => {
        let { x,y, Width,Height } = Widget

        minX = Math.min(minX,x); maxX = Math.max(maxX,x+Width-1)
        minY = Math.min(minY,y); maxY = Math.max(maxY,y+Height-1)
      })

      minX -= padX; maxX += padX
      minY -= padY; maxY += padY

      Screen.Width  = maxX-minX
      Screen.Height = maxY-minY

      WidgetList.forEach((Widget:Indexable) => {
        Widget.x -= minX
        Widget.y -= minY
      })
    }

  /**** ScreenIsOverlay ****/

    public ScreenIsOverlay (ScreenName:string):boolean {
      let Screen = this.existingScreenNamed(ScreenName)
      return Screen.isOverlay
    }

  /**** openScreenList ****/

    public get openScreenList ():Indexable[]  { return this._openScreenList.slice() }
    public set openScreenList (_:Indexable[]) { throwReadOnlyError('openScreenList') }

  /**** ScreenIsOpen ****/

    public ScreenIsOpen (ScreenName:string):boolean {
      let Screen = this.existingScreenNamed(ScreenName)
      return (this._openScreenList.indexOf(Screen) >= 0)
    }

  /**** openScreen ****/

    public openScreen (ScreenName:string):void {
      let Screen = this.existingScreenNamed(ScreenName)

      const openScreenList = this._openScreenList

      let ScreenIndex = openScreenList.indexOf(Screen)
      switch (true) {
        case (ScreenIndex === 0):
          return
        case (ScreenIndex > 0):
          if (ScreenIndex < openScreenList.length-1) {
            openScreenList.splice(ScreenIndex,1)
            openScreenList.push(Screen)
          } else { return }
          break
        default:
          if (Screen.isOverlay) {
            openScreenList.push(Screen)
          } else {
            this._openScreenList = [Screen]
          }
      }
      this.rerender()
    }

  /**** closeScreen ****/

    public closeScreen (ScreenName:string):void {
      let Screen = this.ScreenNamed(ScreenName)
      if (Screen == null) { return }

      const openScreenList = this._openScreenList

      let ScreenIndex = openScreenList.indexOf(Screen)
      if (ScreenIndex < 0) { return }

      if (ScreenIndex === 0) {
        this._openScreenList = [this._StartScreen]
      } else {
        openScreenList.splice(ScreenIndex,1)
      }
      this.rerender()
    }

  /**** closeAllOverlays ****/

    public closeAllOverlays ():void {
      const openScreenList = this._openScreenList
      if (openScreenList.length > 1) {
        openScreenList.length = 1
        this.rerender()
      }
    }

  /**** startWithScreen ****/

    public startWithScreen (ScreenName:string):void {
      this._StartScreen = this.existingScreenNamed(ScreenName)
      this.openScreen(ScreenName)
    }

  /**** StartScreen ****/

    public get StartScreen ():Indexable  { return this._StartScreen }
    public set StartScreen (_:Indexable) { throwReadOnlyError('StartScreen') }

  /**** WidgetNamed ****/

    public WidgetNamed (WidgetName:string):Indexable|undefined {
      const ScreenSet = this._ScreenSet
      for (let ScreenName in ScreenSet) {
        let WidgetList = ScreenSet[ScreenName].WidgetList
        for (let i = 0, l = WidgetList.length; i < l; i++) {
          if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
        }
      }
      return undefined
    }

  /**** existingWidgetNamed ****/

    public existingWidgetNamed (WidgetName:string):Indexable {
      let Widget = this.WidgetNamed(WidgetName)
      if (Widget == null) throwError(
        'NoSuchWidget: a widget named ' + quoted(WidgetName) + ' does not exist'
      )

      return Widget
    }

  /**** WidgetOnScreen ****/

    public WidgetOnScreen (WidgetName:string, Screen:Indexable):Indexable|undefined {
      let WidgetList = Screen.WidgetList
      for (let i = 0, l = WidgetList.length; i < l; i++) {
        if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
      }
      return undefined
    }

  /**** existingWidgetOnScreen ****/

    public existingWidgetOnScreen (WidgetName:string, Screen:Indexable):Indexable {
      let Widget = this.WidgetOnScreen(WidgetName,Screen)
      if (Widget == null) throwError(
        'NoSuchWidget: screen ' + quoted(Screen.Name) + ' does not contain ' +
        'a widget named ' + quoted(WidgetName)
      )

      return Widget
    }

  /**** configure (w/o rerendering) ****/

    public configure (PropSet:Indexable):void {
      for (let ScreenName in PropSet) {
        let Screen = this.existingScreenNamed(ScreenName)
        this.configureScreen(Screen,PropSet[ScreenName])
      }
    }

  /**** configureScreen (w/o rerendering) ****/

    public configureScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let WidgetName in PropSet) {
        let Widget = this.existingWidgetOnScreen(WidgetName,Screen)
        this.configureWidget(Widget,PropSet[WidgetName])
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
          Widget[Property] = Value
        }
      }
    }

  /**** update (w/ rerendering) ****/

    public update (PropSet:Indexable):void {
      for (let ScreenName in PropSet) {
        let Screen = this.existingScreenNamed(ScreenName)
        this.updateScreen(Screen,PropSet[ScreenName])
      }
    }

  /**** updateScreen (w/o rerendering) ****/

    public updateScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let WidgetName in PropSet) {
        let Widget = this.existingWidgetOnScreen(WidgetName,Screen)
        this.updateWidget(Widget,PropSet[WidgetName])
      }
    }

  /**** updateWidget (w/ rerendering) ****/

    public updateWidget (Widget:Indexable,PropSet:Indexable):void {
      for (let Property in PropSet) {
        Widget[Property] = PropSet[Property]
      }

      let View = Widget.View
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
    public state:number = 0

    public rerender () {
      (this as Component).setState(this.state + 1)
    }

    public render (PropSet:Indexable):any {
      let ProtoUX = PropSet.ProtoUX
      ProtoUX['_View'] = this                          // this is a hack, I know

      const openScreenList = ProtoUX.openScreenList

      return html`<div style="
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        <${PUX_ScreenView} Screen=${openScreenList[0]}/>
        ${openScreenList.slice(1).map(
          (Overlay:Indexable) => html`<${PUX_OverlayView} Overlay=${Overlay}/>`
        )}
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

      return html`<div class="PUX Screen ${Classes || ''}" id=${Id} style="
        width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        ${WidgetList.map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget}/>`
        )}
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                             PUX_OverlayView                              --
//------------------------------------------------------------------------------

  class PUX_OverlayView extends Component {
    public render (PropSet:Indexable):any {
      const Overlay = PropSet.Overlay
      Overlay['View'] = this                           // this is a hack, I know

      const { Id, Classes,Style, Width,Height, WidgetList } = Overlay

      return html`<div class="PUX Overlay ${Classes}" id=${Id} style="
        width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        ${WidgetList.map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget}/>`
        )}
      </div>`
    }
  }

//------------------------------------------------------------------------------
//--                              PUX_WidgetView                              --
//------------------------------------------------------------------------------

  class PUX_WidgetView extends Component {
    public state:number = 0

    public rerender () {
      (this as Component).setState(this.state + 1)
    }

    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const WidgetView = ProtoUX.WidgetViewForType(Widget.Type)
      if (WidgetView == null) {
        const {
          Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
        } = Widget

        return html`<div class="PUX Widget ${Classes}" id=${Id} style="
          left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
        " ...${otherProps}>
          ${Value || ''}
        </div>`
      } else {
        return html`<${WidgetView} Widget=${Widget}/>`
      }
    }
  }

//------------------------------------------------------------------------------
//--                               PUX_HTMLView                               --
//------------------------------------------------------------------------------

  class PUX_HTMLView extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX HTMLView Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px
      "
        dangerouslySetInnerHTML=${{__html:Value}}
      />`
    }
  }
  ProtoUX.registerWidgetView('HTMLView',PUX_HTMLView)

//------------------------------------------------------------------------------
//--                         PUX_horizontalSeparator                          --
//------------------------------------------------------------------------------

  class PUX_horizontalSeparator extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX horizontalSeparator Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX verticalSeparator Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      " ...${otherProps}/>`
    }
  }
  ProtoUX.registerWidgetView('verticalSeparator',PUX_verticalSeparator)

//------------------------------------------------------------------------------
//--                              PUX_Button                               --
//------------------------------------------------------------------------------

  class PUX_Button extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Button Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Checkbox Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="checkbox" value=${Value || ''} ...${otherProps}/>
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Radiobutton Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="radio" value=${Value || ''} ...${otherProps}/>
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Gauge Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Progressbar Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <progress value=${Value || ''} ...${otherProps}/>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Progressbar',PUX_Progressbar)

//------------------------------------------------------------------------------
//--                                PUX_Slider                                --
//------------------------------------------------------------------------------

  class PUX_Slider extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Slider Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="range" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX TextlineInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="text" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX PasswordInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX NumberInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="number" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX PhoneNumberInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="tel" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX EMailAddressInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="email" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX URLInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="url" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX TimeInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="time" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX DateTimeInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="datetime-local" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX DateInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="date" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX WeekInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="week" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX MonthInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="month" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX SearchInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="search" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View,
        Placeholder, onDrop, ...otherProps
      } = Widget

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

      return html`<label class="PUX FileInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX ColorInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <input type="color" value=${Value || ''} ...${otherProps}/>
      </div>`
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
        Id, Type,Classes,Style, x,y, Width,Height, Value,Options, View, ...otherProps
      } = Widget

      return html`<div class="PUX DropDown Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <select ...${otherProps}>
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
        Id, Type,Classes,Style, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX TextInput Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; ${Style || ''}
      ">
        <textarea ...${otherProps}>${Value || ''}</textarea>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('TextInput',PUX_TextInput)

//------------------------------------------------------------------------------
//--                                 PUX_Icon                                 --
//------------------------------------------------------------------------------

  class PUX_Icon extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes, x,y, Width,Height, Value, View, ...otherProps
      } = Widget

      return html`<div class="PUX Icon Widget ${Classes}" id=${Id} style="
        left:${x}px; top:${y}px; width:${Width}px; height:${Height}px
      "/>
        <div/>
      </>`
    }
  }
  ProtoUX.registerWidgetView('Icon',PUX_Icon)



/*
        return html`
          <style>
            :host {
              display:inline-block; position:relative;
              width:24px; height:24px;
              font-size:0px; line-height:0px;
            }
            div {
              display:block; position:absolute;
              left:0px; top:0px; width:100%; height:100%;
              -webkit-mask-image:url(${Value});    mask-image:url(${Value});
              -webkit-mask-size:contain;           mask-size:contain;
              -webkit-mask-position:center center; mask-position:center center;
              background-color:${Color};
            }
          </style>
*/
