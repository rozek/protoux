/*******************************************************************************
*                                                                              *
*                                ProtoUX (PUX)                                 *
*                                                                              *
*******************************************************************************/

  import {
//  throwError,
    quoted,
    ValueIsString, ValueIsPlainObject, ValueIsListSatisfying, ValueIsFunction,
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

  .textured { background-image:repeat }

  .vertically-centered {
    display:flex; align-items:center;
  }

  .disabled            { opacity:0.3 }
  .readonly            { background:none }
  .no-pointer-events   { pointer-events:none }

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
  .PUX.Text     { font-size:14px; font-weight:normal; padding:2px 0px 0px 0px; text-aline:justify }

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
  .PUX.Tab        { border:none; border-width:0px 0px 4px 0px }
  .PUX.Tab.active { border-style:solid; border-color:black }



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

    private _StartScreen:Indexable = {}          // just to satisfy the compiler
    private _openScreen:Indexable  = {}                                  // dto.

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
      let Screen = this.existingScreenNamed(ScreenName)
      if (this._openScreen === Screen) { return }

      this._openScreen = Screen
      this.rerender()
    }

  /**** closeScreen ****/

    public closeScreen (ScreenName:string):void {
      let Screen = this.ScreenNamed(ScreenName)
      if (Screen == null) { return }

      if (this._openScreen !== Screen) { return }

      this._openScreen = this._StartScreen
      this.rerender()
    }

  /**** ScreenIsOpen ****/

    public ScreenIsOpen (ScreenName:string):boolean {
      let Screen = this.existingScreenNamed(ScreenName)
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

  /**** WidgetInContainer ****/

    public WidgetInContainer (WidgetName:string, Container:Indexable):Indexable|undefined {
      let WidgetList = Container.WidgetList || []
      for (let i = 0, l = WidgetList.length; i < l; i++) {
        if (WidgetList[i].Name === WidgetName) { return WidgetList[i] }
      }
      return undefined
    }

  /**** existingWidgetInContainer ****/

    public existingWidgetInContainer (WidgetName:string, Container:Indexable):Indexable {
      let Widget = this.WidgetInContainer(WidgetName,Container)
      if (Widget == null) throwError(
        'NoSuchWidget: could not find widget named ' + quoted(WidgetName)
      )

      return Widget
    }

  /**** stuffing ****/

    public stuff (PropSet:Indexable):void {
      for (let ScreenName in PropSet) {
        let Screen = this.existingScreenNamed(ScreenName)
        this.stuffScreen(Screen,PropSet[ScreenName])
      }
    }

  /**** stuffScreen  ****/

    public stuffScreen (Screen:Indexable, PropSet:Indexable):void {
      for (let WidgetName in PropSet) {
        let Widget = this.existingWidgetOnScreen(WidgetName,Screen)
        this.stuffWidget(Widget,PropSet[WidgetName])
      }
    }

  /**** stuffWidget  ****/

    public stuffWidget (Widget:Indexable, PropSet:Indexable):void {
      if (this.ValueIsStuff(PropSet)) {
        const fromScreen = this.existingScreenNamed(PropSet.from)
        Widget.WidgetList = PropSet.with.map(
          (WidgetName:string) => this.existingWidgetOnScreen(WidgetName,fromScreen)
        )
      } else {
        for (let Property in PropSet) {
          const innerWidget = this.existingWidgetInContainer(Property,Widget)
          this.stuffWidget(innerWidget,PropSet[Property])
        }
      }
    }

  /**** ValueIsStuff  ****/

    public ValueIsStuff (Candidate:any):boolean {
      return (
        ValueIsPlainObject(Candidate) &&
        ValueIsString(Candidate.from) &&
        ValueIsListSatisfying(Candidate.with,ValueIsString)
      )
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

  /**** reactiveTab ****/

    public reactiveTab (ObservableName:string, TabName:string):Indexable {
      return {
        active:this.updatedFrom(() => this.observed[ObservableName] === TabName),
        onClick: () => this.observed[ObservableName] = TabName
      }
    }

  /**** reactiveTabPane ****/

    public reactiveTabPane (ObservableName:string, TabName:string):Indexable {
      return {
        hidden:this.updatedFrom(() => this.observed[ObservableName] !== TabName)
      }
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

      const openScreen = ProtoUX._openScreen

      return html`<div style="
        display:block; position:absolute;
        left:0px; top:0px; right:0px; bottom:0px;
      ">
        <${PUX_ScreenView} ProtoUX=${ProtoUX} Screen=${openScreen}/>
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
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
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
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
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
          return html`<div class="PUX Widget ${Classes}" id=${Id} style="${CSSGeometry}" ...${otherProps}>
            ${(WidgetList || []).map(
              (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
            )}
          </div>`
//      case 'Container':                            // a box with inner widgets
        case 'Box':                                 // without any inner widgets
          return html`<div class="PUX Widget ${Classes}" id=${Id} style="
            ${Style || ''}; ${CSSGeometry}
          " ...${otherProps}/>`
        default:                         // default rendering like a "container"
          const WidgetView = ProtoUX.WidgetViewForType(Widget.Type)
          if (WidgetView == null) {
            const {
              Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value, hidden,View,
              WidgetList, ...otherProps
            } = Widget

            return html`<div class="PUX Widget ${Classes}" id=${Id} style="
              ${Style || ''}; ${CSSGeometry}
            " ...${otherProps}>
              ${Value || ''}
              ${(WidgetList || []).map(
                (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
              )}
            </div>`
          } else {
            return html`<${WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
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

      return html`<div class="PUX horizontalSeparator Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX verticalSeparator Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
      " ...${otherProps}/>`
    }
  }
  ProtoUX.registerWidgetView('verticalSeparator',PUX_verticalSeparator)

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

      return html`<div class="PUX HTMLView Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX TextView Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<img class="PUX ImageView Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<iframe class="PUX WebView Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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
        View, ...otherProps
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

      return html`<div class="PUX Icon Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
      "><div style="
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

      return html`<div class="PUX PseudoDropDown Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Button Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Checkbox Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Radiobutton Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Gauge Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Progressbar Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Slider Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX TextlineInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX PasswordInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX NumberInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX PhoneNumberInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX EMailAddressInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX URLInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX TimeInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX DateTimeInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX DateInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX WeekInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX MonthInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX SearchInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<label class="PUX FileInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX ColorInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX DropDown Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX TextInput Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
      ">
        <textarea ...${otherProps}>${Value || ''}</textarea>
      </div>`
    }
  }
  ProtoUX.registerWidgetView('TextInput',PUX_TextInput)

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

      return html`<div class="PUX Accordion Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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
    public state:number = 0

    public rerender () {
      (this as Component).setState(this.state + 1)
    }

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

      return html`<div class="PUX Fold Widget ${Classes}" id=${Id} style="
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
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, Value,activeCardIndex,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      const CardIndex   = (
        activeCardIndex == null
        ? 0
        : (activeCardIndex < 0 ? WidgetList.length+activeCardIndex : activeCardIndex)
      )
      const activeCard = WidgetList[CardIndex] || WidgetList[0]

      return html`<div class="PUX Deck Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
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

      return html`<div class="PUX Card Widget ${Classes}" id=${Id} style="
        border:none; ${Style || ''};
        left:0px; top:0px; right:0px; bottom:0px; width:auto; height:auto
      " ...${otherProps}>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_Card} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </>`
    }
  }
  ProtoUX.registerWidgetView('Card',PUX_Card)

//------------------------------------------------------------------------------
//--                                 PUX_Tab                                  --
//------------------------------------------------------------------------------

  class PUX_Tab extends PUX_WidgetView {
    public render (PropSet:Indexable):any {
      const Widget = PropSet.Widget
      Widget.View = this

      const {
        Id, Type,Classes,Style, Anchoring, x,y, Width,Height, active,Value,
        View, WidgetList, ...otherProps
      } = Widget

      const CSSGeometry = (
        (x != null) && (Width  != null) && (y != null) && (Height != null)
        ? `left:${x}px; top:${y}px; width:${Width}px; height:${Height}px; right:auto; bottom:auto;`
        : ''
      )

      return html`<div class="PUX ${active ? 'active' : ''} Tab Widget ${Classes}" id=${Id} style="
        ${Style || ''}; ${CSSGeometry}
      " ...${otherProps}>
        ${(WidgetList || []).map(
          (Widget:Indexable) => html`<${PUX_WidgetView} Widget=${Widget} ProtoUX=${PropSet.ProtoUX}/>`
        )}
      </div>`
    }
  }
  ProtoUX.registerWidgetView('Tab',PUX_Tab)

//------------------------------------------------------------------------------
//--                               PUX_centered                               --
//------------------------------------------------------------------------------

  class PUX_centered extends Component {
    public render (PropSet:Indexable):any {
      return html`<div class="centered">
        ${PropSet.children}
      </div>`
    }
  }


