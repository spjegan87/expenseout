import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppService } from '../../core-module/services/app.service';
declare var $: any;
/********************
 * Author: Padma Priya CK, Naveen.s
 * Desc: push notification
 * Created Date : 29-1-2021
 * Powered by : Infiniti software solutions
 */
@Injectable()
/**
 * Messaging service
 */
export class MessagingService {
    /**
     * currentMessage
     */
    public currentMessage = new BehaviorSubject(null);
    /**
     * key
     */
    public fcm_key = new BehaviorSubject(null);
    // Observable string sources
    private componentMethodCallSource = new Subject<any>();
    // Observable string streams
    componentMethodCalled$ = this.componentMethodCallSource.asObservable();
    /**
     * @param angularFireMessaging  : angularFireMessaging
     * @param appService  : appService notification count
     */
    constructor(private angularFireMessaging: AngularFireMessaging, private appService: AppService) { }
    /**
     * requestPermission
     */
    public requestPermission(): any {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                this.fcm_key.next(token);
            },
            (err) => {
                console.error('Unable to get permission to notify.', err);
            }
        );
    }
    /**
      * receiveMessage
      */
    public receiveMessage(): any {
        this.angularFireMessaging.messages.subscribe((payload) => {
            this.appService.notification = parseInt(this.appService.notification) + 1;
            $('.cls-app-notify').append("<div class='cls-notif'>" +
                "<em class='icon-16-info mr-2'></em>" +
                "<span id='cls-pushnotify'>" + payload['notification']['body'] + "</span>" +
                "</div>");
            setTimeout(() => {
                $('.cls-app-notify').addClass('cls-slideIn');
            }, 3000);
            setTimeout(() => {
                $('.cls-app-notify').removeClass('cls-slideIn');
                $('.cls-notif').remove();
            }, 7000);
            this.currentMessage.next(payload);
        });
    }
}