/*jslint browser:true */
/*globals jQuery */

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function() {};
    F.prototype = o;
    return new F();
  };
}

var Calagator = {
  activate_calendars: function() {
                        var that = this;
                        jQuery('a[rel=calendar][type=application/json]').each(function(i, e) { that.create(e); });
                      },

  create: function(calendar_link) {
            var calendar = Object.create(this);

            calendar.href = jQuery(calendar_link).attr('href');
            calendar.container = jQuery(calendar_link).replaceWith('<div class="calendar"></div>');
            calendar.container = jQuery('div.calendar');
            calendar.events = [];

            jQuery.getJSON(calendar.href + '&callback=?',
              function(events) {
                jQuery.each(events, function(i, item) {
                  calendar.Item.create(item, calendar);
                });
              });
          },

  Item: {
    create: function(data, calendar) {
              var item = Object.create(this),
                  start_time = item.parse_date(data.start_time),
                  now = new Date(),
                  yesterday = now - 86400000;
              if (start_time > yesterday) {
                item.data = data;
                item.start_time = item.parse_date(data.start_time);
                item.end_time   = item.parse_date(data.end_time);
                item.calendar = calendar;
                item.calendar.container.append('<div class="vevent">' + item.summary() + item.start_and_end() + ' ' + item.venue() + item.description() + '</div>');
                item.calendar.events.push(this);
              }
            },
    summary: function() {
               var calagatorUrl = 'http://calagator.org/events/' + encodeURIComponent(this.data.id);
               return '<a href="' + calagatorUrl + '"><h3 class="summary title">' + this.data.title + '</h3></a>';
             },
    print_start_time: function() {
                  var pretty_time = this.start_time.strftime('%A, %B %d, %Y from %I:%M %P');
                  return '<abbr style="border:none" class="dtstart" title="' + this.iso8601(this.start_time) + '">' + pretty_time + '</abbr>';
                },
    print_end_time: function() {
                var pretty_time = this.end_time.strftime('%I:%M %P');
                return '<abbr style="border:none" class="dtend" title="' + this.iso8601(this.end_time) + '">' + pretty_time + '</abbr>';
              },
    start_and_end: function() {
                     return '<span class="date">' + this.print_start_time() + ' &ndash; ' + this.print_end_time() + '</span>';
                   },
    venue: function() {
        var venue = this.data.venue;
        return '<span class="venue">at ' + venue.title + ', ' + venue.street_address + '</span>';
    },
    description: function() {
                   return '<p class="description">' + this.data.description.replace(/\n/g, '<br />') + '</p>';
                 },
    iso8601: function(time) {
               var tz_offset = time.toString().match(/([+\-]\d+)/);
               if (tz_offset.length > 1) {
                 return time.strftime('%Y-%m-%dT%H:%M:%S') + tz_offset[1];
               } else {
                 return time.strftime('%Y-%m-%dT%H:%M:%S');
               }
             },
    parse_date: function(date) {
                    var prepared;
                    prepared = date.replace(/T/, ' ');
                    prepared = prepared.replace(/-/, '/');
                    prepared = prepared.replace(/-/, '/');
                    return (new Date(prepared));
                }
  }
};

jQuery(document).ready(function() {
  Calagator.activate_calendars();
});
