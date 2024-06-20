/*******************************************************************************
*                                                                              *
*                                ProtoUX (PUX)                                 *
*                                                                              *
*******************************************************************************/
import { Component } from 'htm/preact';
/**** make some existing types indexable ****/
interface Indexable {
    [Key: string]: any;
}
/**** throwError - simplifies construction of named errors ****/
export declare function throwError(Message: string): never;
/**** throwReadOnlyError ****/
export declare function throwReadOnlyError(Name: string): never;
export declare function DragRecognizerFor(Widget: Indexable, OptionSet: Indexable): Function;
export declare function DragClickRecognizerFor(Widget: Indexable, OptionSet: Indexable): Function;
export declare class ProtoUX {
    private _IdPrefix;
    private _ImageFolder;
    private _ScreenSet;
    private _DialogSet;
    private _observed;
    private _UpdaterList;
    private _StartScreen;
    private _openScreen;
    private _openDialogs;
    private _View;
    private static _WidgetViewRegistry;
    /**** constructor ****/
    constructor(IdPrefix?: string);
    /**** ImageFolder - where to find image files ****/
    get ImageFolder(): string;
    set ImageFolder(newFolder: string);
    /**** Style - represents the CSS stylesheet of a given ProtoUX project ****/
    get Style(): string;
    set Style(newStyle: string);
    /**** ScreenSet - represents the set of screens in a ProtoUX project ****/
    get ScreenSet(): Indexable;
    set ScreenSet(newSet: Indexable);
    /**** observed - makes ProtoUX projects "reactive" ****/
    get observed(): Indexable;
    set observed(_: Indexable);
    /**** ScreenNamed ****/
    ScreenNamed(ScreenName: string): Indexable | undefined;
    /**** existingScreenNamed ****/
    existingScreenNamed(ScreenName: string): Indexable;
    /**** packScreen ****/
    packScreen(ScreenName: string, padX?: number, padY?: number): void;
    /**** openScreen ****/
    openScreen(ScreenName: string): void;
    /**** closeScreen ****/
    closeScreen(ScreenName: string): void;
    /**** ScreenIsOpen ****/
    ScreenIsOpen(ScreenName: string): boolean;
    /**** startWithScreen ****/
    startWithScreen(ScreenName: string): void;
    /**** StartScreen ****/
    get StartScreen(): Indexable;
    set StartScreen(_: Indexable);
    /**** extractAllDialogs ****/
    extractAllDialogs(): void;
    /**** DialogNamed ****/
    DialogNamed(DialogName: string): Indexable | undefined;
    /**** existingDialogNamed ****/
    existingDialogNamed(DialogName: string): Indexable;
    /**** openDialog ****/
    openDialog(DialogName: string): void;
    /**** closeDialog ****/
    closeDialog(DialogName: string): void;
    /**** DialogIsOpen ****/
    DialogIsOpen(DialogName: string): boolean;
    /**** openDialogs ****/
    get openDialogs(): Indexable[];
    set openDialogs(_: Indexable[]);
    /**** closeAllDialogs ****/
    closeAllDialogs(): void;
    /**** DialogIsFrontMost ****/
    DialogIsFrontMost(DialogName: string): boolean;
    /**** bringDialogToFront ****/
    bringDialogToFront(DialogName: string): void;
    /**** WidgetNamed ****/
    WidgetNamed(WidgetName: string): Indexable | undefined;
    /**** existingWidgetNamed ****/
    existingWidgetNamed(WidgetName: string): Indexable;
    /**** WidgetOnScreen/Dialog ****/
    WidgetOnScreen(WidgetName: string, Screen: Indexable): Indexable | undefined;
    WidgetOnDialog(WidgetName: string, Dialog: Indexable): Indexable | undefined;
    /**** existingWidgetOnScreen/Dialog ****/
    existingWidgetOnScreen(WidgetName: string, Screen: Indexable): Indexable;
    existingWidgetOnDialog(WidgetName: string, Dialog: Indexable): Indexable;
    /**** WidgetInContainer ****/
    WidgetInContainer(WidgetName: string, Container: Indexable): Indexable | undefined;
    /**** existingWidgetInContainer ****/
    existingWidgetInContainer(WidgetName: string, Container: Indexable): Indexable;
    /**** stuffing ****/
    stuff(PropSet: Indexable): void;
    /**** stuffScreen ****/
    stuffScreen(Screen: Indexable, PropSet: Indexable): void;
    /**** stuffDialog ****/
    stuffDialog(Dialog: Indexable, PropSet: Indexable): void;
    /**** stuffWidget ****/
    stuffWidget(Widget: Indexable, PropSet: Indexable): void;
    /**** ValueIsStuff ****/
    ValueIsStuff(Candidate: any): boolean;
    /**** configure (w/o rerendering) ****/
    configure(PropSet: Indexable): void;
    /**** configureScreen (w/o rerendering) ****/
    configureScreen(Screen: Indexable, PropSet: Indexable): void;
    /**** configureDialog (w/o rerendering) ****/
    configureDialog(Dialog: Indexable, PropSet: Indexable): void;
    /**** configureWidget (w/o rerendering) ****/
    configureWidget(Widget: Indexable, PropSet: Indexable): void;
    /**** update (w/ rerendering) ****/
    update(PropSet: Indexable): void;
    /**** updateScreen (w/o rerendering) ****/
    updateScreen(Screen: Indexable, PropSet: Indexable): void;
    /**** updateDialog (w/o rerendering) ****/
    updateDialog(Dialog: Indexable, PropSet: Indexable): void;
    /**** updateWidget (w/ rerendering) ****/
    updateWidget(Widget: Indexable, PropSet: Indexable): void;
    /**** updatedFrom ****/
    updatedFrom(Updater: Function): Indexable;
    /**** View ****/
    get View(): PUX_View | undefined;
    set View(_: PUX_View | undefined);
    /**** renderInto ****/
    renderInto(Container: HTMLElement): void;
    /**** rerender ****/
    rerender(): void;
    /**** registerWidgetView ****/
    static registerWidgetView(Name: string, Class: Function): void;
    /**** WidgetViewForType ****/
    static WidgetViewForType(Name: string): Function | undefined;
}
declare class PUX_View extends Component {
    state: Indexable;
    rerender(): void;
    render(PropSet: Indexable): any;
}
export {};
