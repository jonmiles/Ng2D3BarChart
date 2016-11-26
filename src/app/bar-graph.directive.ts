import {Directive, ElementRef, HostListener, OnInit} from '@angular/core';

import * as d3 from 'd3';

import {LetterFrequency} from './letter-frequency.interface';


@Directive({
  selector: '[appBarGraph]'
})

export class BarGraphDirective implements OnInit {

  private height: number;
  private svg: any;
  private width: number;
  private x: any;
  private xAxis: any;
  private y: any;
  private yAxis: any;

  @HostListener('window:resize', ['$event.target'])
    onResize() {
      this.render();
    };

  constructor(private elementRef: ElementRef) {
    console.log('BarGraphDirective.constructor(%o)', elementRef);
  }

  ngOnInit(): void {
    this.render();
  }

  private render(): void {
    const margin = {top: 40, right: 20, bottom: 30, left: 60};
    this.width = (this.elementRef.nativeElement.offsetWidth - (margin.left + margin.right));
    this.height = (this.elementRef.nativeElement.offsetHeight - (margin.top + margin.bottom));

    this.x = d3.scale.ordinal()
      .rangeRoundBands([0, this.width], .1);

    this.y = d3.scale.linear()
      .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
      .scale(this.x)
      .orient('bottom');

    this.yAxis = d3.svg.axis()
      .scale(this.y)
      .orient('left');

    d3.select('svg').remove();

    this.svg = d3.select(this.elementRef.nativeElement)
      .append('svg')
        .attr('width', this.width + margin.left + margin.right)
        .attr('height', this.height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    d3.csv('../assets/data.csv', this.type.bind(this), (error: Error, data: LetterFrequency[]) => {
      this.x.domain(data.map((d: LetterFrequency) => d.letter));
      this.y.domain([0, d3.max(data, (d: LetterFrequency) => d.frequency)]);

      this.svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + this.height + ')')
          .call(this.xAxis);

      this.svg.append('g')
          .attr('class', 'y axis')
          .call(this.yAxis);

      this.svg.selectAll('.bar')
          .data(data)
        .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', (d: LetterFrequency) => this.x(d.letter))
          .attr('width', this.x.rangeBand())
          .attr('y', (d: LetterFrequency) => this.y(d.frequency))
          .attr('height', (d: LetterFrequency) => this.height - this.y(d.frequency));
      }
    );
  }

  private type(d: LetterFrequency): LetterFrequency {
    d.frequency = Number(d.frequency);
    return d;
  }
}
