// >> angular-listview-swipe-execute-sticky-component
import {Component, OnInit} from "@angular/core";
import {ObservableArray} from "data/observable-array";
import {DataItem} from "../dataItem";
import {DataItemService} from "../dataItem.service";
import * as listViewModule from "nativescript-telerik-ui-pro/listview";
import * as FrameModule from "ui/frame";
import * as utilsModule from "utils/utils";

@Component({
    moduleId: module.id,
    selector: "listview-swipe-execute-sticky",
    providers: [DataItemService],
    templateUrl: "listview-swipe-execute-sticky.component.html",
    styleUrls: ["listview-swipe-execute-sticky.component.css"]
})
export class ListviewSwipeExecuteStickyComponent implements OnInit {
    private _dataItems: ObservableArray<DataItem>;
    private _selectedItems: string;

    constructor(private _dataItemService: DataItemService) {
    }

    get dataItems(): ObservableArray<DataItem> {
        return this._dataItems;
    }

    ngOnInit() {
        this._dataItems = new ObservableArray(this._dataItemService.getPostDataItems());
    }

    public onSwipeCellStarted(args: listViewModule.ListViewEventData) {
        var swipeLimits = args.data.swipeLimits;

        swipeLimits.threshold = 60 * utilsModule.layout.getDisplayDensity();
        swipeLimits.left = 80 * utilsModule.layout.getDisplayDensity();
        swipeLimits.right = 80 * utilsModule.layout.getDisplayDensity();
    }

    public onSwipeCellFinished(args: listViewModule.ListViewEventData) {
        if (args.data.x > 200) {
            console.log("Perform left action");
        } else if (args.data.x < -200) {
            console.log("Perform right action");
        }
    }

    public onItemClick(args: listViewModule.ListViewEventData) {
        var listView = <listViewModule.RadListView>FrameModule.topmost().currentPage.getViewById("listView");
        listView.notifySwipeToExecuteFinished();
        console.log("Item click: " + args.itemIndex);
    }

    public onLeftSwipeClick(args) {
        var listView = <listViewModule.RadListView>FrameModule.topmost().currentPage.getViewById("listView");
        listView.notifySwipeToExecuteFinished();
    }

    public onRightSwipeClick(args) {
        var listView = <listViewModule.RadListView>FrameModule.topmost().currentPage.getViewById("listView");
        listView.notifySwipeToExecuteFinished();
    }
}
// << angular-listview-swipe-execute-sticky-component